const findAll = `
SELECT
json_build_object(
	'inStock', in_stock,
  'cultivation', json_build_object(
  	'id', cultivation.id,
    'name', cultivation.name,
    'image', cultivation.image
  ),
  'classification', json_build_object(
  	'id', classification.id,
    'name', classification.name
  ),
  'unit', json_build_object(
  	'id', unit.id,
    'name', unit.name,
    'abbreviation', unit.abbreviation
  )
) stock_item
FROM (
  SELECT 
    cultivation_id, classification_id, unit_id,
    SUM(in_stock) in_stock
  FROM havests harvest
  GROUP BY cultivation_id, classification_id, unit_id
) temp_1
INNER JOIN cultivations cultivation ON cultivation.id = temp_1.cultivation_id
INNER JOIN classifications classification ON classification.id = temp_1.classification_id
INNER JOIN units unit ON unit.id = temp_1.unit_id
ORDER BY cultivation.name
`;

const findStockItemDetails = `
SELECT
temp_1.in_stock,
json_build_object(
	'id', cultivation.id,
  'name', cultivation.name
) cultivation,
json_build_object(
	'id', classification.id,
  'name', classification.name
) classicafition,
json_build_object(
	'id', unit.id,
  'name', unit.name,
  'abbreviation', unit.abbreviation
) unit,
temp_1.origins
FROM (
  SELECT
  harvest.cultivation_id cultivation_id, 
  harvest.classification_id classification_id, 
  harvest.unit_id unit_id,
  SUM(harvest.in_stock) in_stock,
  JSON_AGG(json_build_object(
    'ruralProperty', json_build_object(
      'id', rural_property.id,
      'name', rural_property.name
    ),
    'field', json_build_object(
      'id', field.id,
      'name', field.name
    ),
    'harvest', json_build_object(
      'id', harvest.id,
      'date', harvest.date,
      'inStock', harvest.in_stock
    )
  )) origins
  FROM harvests harvest
  INNER JOIN rural_properties rural_property ON rural_property.id = harvest.rural_property_id
  INNER JOIN fields field ON field.id = harvest.field_id
  WHERE harvest.cultivation_id = $1 AND harvest.classification_id = $2 AND harvest.unit_id = $3
  GROUP BY harvest.cultivation_id, harvest.classification_id, harvest.unit_id
) temp_1
INNER JOIN cultivations cultivation ON cultivation.id = temp_1.cultivation_id
INNER JOIN classifications classification ON classification.id = temp_1.classification_id
INNER JOIN units unit ON unit.id = temp_1.unit_id;
`;

export default { findAll, findStockItemDetails };