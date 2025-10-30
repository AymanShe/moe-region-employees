/**
 * Phase 1.5 data integrity smoke test.
 * - Confirms metadata totals match actual counts.
 * - Verifies every SVG path id has region data and vice versa.
 * - Performs lightweight field validation for each employee.
 *
 * Usage: node scripts/validate-data.js
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'regions.json');
const htmlPath = path.join(__dirname, '..', 'index.html');

function readJson(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Failed to read JSON at ${filePath}:`, error.message);
    process.exitCode = 1;
    throw error;
  }
}

function readHtml(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Failed to read HTML at ${filePath}:`, error.message);
    process.exitCode = 1;
    throw error;
  }
}

function extractSvgRegionIds(html) {
  const regex = /<path[^>]*\sid="([^"]+)"/g;
  const ids = new Set();
  let match;

  while ((match = regex.exec(html)) !== null) {
    ids.add(match[1]);
  }

  return ids;
}

function validateRegions(data) {
  const errors = [];
  const warnings = [];

  if (!data || typeof data !== 'object') {
    errors.push('Root data object is missing or invalid.');
    return { errors, warnings, stats: { regions: 0, employees: 0 } };
  }

  const regions = data.regions;
  if (!regions || typeof regions !== 'object') {
    errors.push('Property "regions" is missing or not an object.');
    return { errors, warnings, stats: { regions: 0, employees: 0 } };
  }

  let employeeTotal = 0;

  Object.entries(regions).forEach(([regionId, region]) => {
    if (!region) {
      errors.push(`Region "${regionId}" is null or undefined.`);
      return;
    }

    if (!region.id) {
      warnings.push(`Region "${regionId}" is missing "id"; expected "${regionId}".`);
    } else if (region.id !== regionId) {
      warnings.push(`Region "${regionId}" has mismatched id "${region.id}".`);
    }

    if (!region.name) {
      errors.push(`Region "${regionId}" is missing "name".`);
    }

    if (!Array.isArray(region.employees)) {
      errors.push(`Region "${regionId}" has invalid "employees" (expected array).`);
      return;
    }

    employeeTotal += region.employees.length;

    region.employees.forEach((employee, index) => {
      const label = `Region "${regionId}" employee #${index + 1}`;
      if (!employee || typeof employee !== 'object') {
        errors.push(`${label} entry is not an object.`);
        return;
      }
      if (!employee.id) {
        warnings.push(`${label} is missing "id".`);
      }
      if (!employee.name) {
        errors.push(`${label} is missing "name".`);
      }
      if (!employee.position) {
        errors.push(`${label} is missing "position".`);
      }
      if (!employee.startDate) {
        warnings.push(`${label} is missing "startDate".`);
      }
      if (employee.images && !Array.isArray(employee.images)) {
        warnings.push(`${label} has "images" that is not an array.`);
      }
    });
  });

  return {
    errors,
    warnings,
    stats: { regions: Object.keys(regions).length, employees: employeeTotal }
  };
}

function compareMetadata(metadata, stats) {
  const warnings = [];
  if (!metadata) {
    warnings.push('Metadata is missing.');
    return warnings;
  }

  if (typeof metadata.totalRegions === 'number' && metadata.totalRegions !== stats.regions) {
    warnings.push(
      `Metadata totalRegions (${metadata.totalRegions}) does not match actual count (${stats.regions}).`
    );
  }

  if (typeof metadata.totalEmployees === 'number' && metadata.totalEmployees !== stats.employees) {
    warnings.push(
      `Metadata totalEmployees (${metadata.totalEmployees}) does not match actual count (${stats.employees}).`
    );
  }

  return warnings;
}

function diffSets(expected, actual, expectedLabel, actualLabel) {
  const onlyInExpected = [];
  const onlyInActual = [];

  expected.forEach((value) => {
    if (!actual.has(value)) {
      onlyInExpected.push(value);
    }
  });

  actual.forEach((value) => {
    if (!expected.includes(value)) {
      onlyInActual.push(value);
    }
  });

  return {
    onlyInExpected,
    onlyInActual,
    expectedLabel,
    actualLabel
  };
}

function reportDiff(diff) {
  const { onlyInExpected, onlyInActual, expectedLabel, actualLabel } = diff;
  if (onlyInExpected.length > 0) {
    console.warn(
      `${expectedLabel} missing in ${actualLabel}: ${onlyInExpected.join(', ')}`
    );
  }
  if (onlyInActual.length > 0) {
    console.warn(
      `${actualLabel} has extra entries not in ${expectedLabel}: ${onlyInActual.join(', ')}`
    );
  }
}

function main() {
  const data = readJson(dataPath);
  const html = readHtml(htmlPath);

  const svgRegionIds = extractSvgRegionIds(html);
  const jsonRegionIds = Object.keys(data.regions || {});

  const { errors, warnings, stats } = validateRegions(data);
  const metadataWarnings = compareMetadata(data.metadata, stats);

  const diff = diffSets(jsonRegionIds, svgRegionIds, 'JSON regions', 'SVG regions');

  console.log('--- Phase 1.5 Data Integrity Report ---');
  console.log(`Regions in JSON: ${stats.regions}`);
  console.log(`Regions in SVG: ${svgRegionIds.size}`);
  console.log(`Employees in JSON: ${stats.employees}`);

  if (errors.length > 0) {
    console.error('\nErrors:');
    errors.forEach((msg) => console.error(`  - ${msg}`));
    process.exitCode = 1;
  } else {
    console.log('\nNo blocking errors detected.');
  }

  const combinedWarnings = [...warnings, ...metadataWarnings];
  if (combinedWarnings.length > 0) {
    console.warn('\nWarnings:');
    combinedWarnings.forEach((msg) => console.warn(`  - ${msg}`));
  } else {
    console.log('\nNo warnings detected.');
  }

  if (combinedWarnings.length === 0 && errors.length === 0) {
    console.log('\nData integrity check passed ✅');
  } else {
    console.log('\nData integrity check completed with findings. Review the log above.');
  }

  reportDiff(diff);
}

main();
