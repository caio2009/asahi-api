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
    SUM(harvest_in_stock) in_stock
  FROM (
    SELECT
    harvest.in_stock harvest_in_stock,
    cultivation.id cultivation_id, classification.id classification_id, unit_id
    FROM harvests harvest
    INNER JOIN rural_properties rural_property ON rural_property.id = harvest.rural_property_id
    INNER JOIN fields field ON field.id = harvest.field_id
    INNER JOIN cultivations cultivation ON cultivation.id = harvest.cultivation_id
    INNER JOIN classifications classification ON classification.id = harvest.classification_id
    INNER JOIN units unit ON unit.id = harvest.unit_id
  ) temp_1
  GROUP BY cultivation_id, classification_id, unit_id
) temp_2
INNER JOIN cultivations cultivation ON cultivation.id = temp_2.cultivation_id
INNER JOIN classifications classification ON classification.id = temp_2.classification_id
INNER JOIN units unit ON unit.id = temp_2.unit_id
ORDER BY cultivation.name
`;

export default {
  findAll
};