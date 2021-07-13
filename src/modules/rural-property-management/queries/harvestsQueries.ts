// export const findAllMappedByDate = `
// SELECT TO_CHAR(date, 'DD/MM/YYYY') date, ARRAY_AGG(
//   '{' ||
//   '"quantity":' || quantity || ',' ||
//   '"inStock":' || in_stock || ',' ||
//   '"ruralProperty":{' ||
//   '"id":' || '"' || rural_property.id || '",' ||
//   '"name":' || '"' || rural_property.name || '"' ||
//   '},' ||
//   '"field":{' || 
//   '"id":' || '"' || field.id || '",' ||
//   '"name":' || '"' || field.name || '"' ||
//   '},' ||
//   '"cultivation":{' ||
//   '"id":' || '"' || cultivation.name || '",' ||
//   '"name":' || '"' || cultivation.name || '"' ||
//   '},' ||
//   '"classification":{' || 
//   '"id":' || '"' || classification.id || '",' ||
//   '"name":' || '"' || classification.name || '"' ||
//   '},' ||
//   '"unit":{' || 
//   '"id":' || '"' || unit.id || '",' ||
//   '"abbreviation":' || '"' || unit.abbreviation || '"' ||
//   '}' ||
//   '}'
// ) harvests
// FROM harvests harvest
// INNER JOIN rural_properties rural_property ON harvest.rural_property_id = rural_property.id 
// INNER JOIN fields field ON harvest.field_id = field.id
// INNER JOIN cultivations cultivation ON harvest.cultivation_id = cultivation.id
// INNER JOIN classifications classification ON harvest.classification_id = classification.id
// INNER JOIN units unit ON harvest.unit_id = unit.id
// GROUP BY TO_CHAR(date, 'DD/MM/YYYY')
// `;

export const findAllMappedByDate = `
SELECT
harvest.date date,
JSON_AGG(json_build_object(
	'id', harvest.id,
	'quantity', harvest.quantity,
	'inStock', harvest.in_stock,
  	'ruralProperty', json_build_object(
    	'id', rural_property.id,
      	'name', rural_property.name
    ),
  	'field', json_build_object(
   		'id', field.id,
      	'name', field.name
    ),
  	'cultivation', json_build_object(
    	'id', cultivation.id,
      	'name', cultivation.name
    ),
  	'classification', json_build_object(
    	'id', classification.id,
      	'name', classification.name
    ),
  	'unit', json_build_object(
    	'id', unit.id,
      	'abbreviation', unit.abbreviation
    )
)) harvests
FROM harvests harvest
INNER JOIN rural_properties rural_property ON rural_property.id = harvest.rural_property_id
INNER JOIN fields field ON field.id = harvest.field_id
INNER JOIN cultivations cultivation ON cultivation.id = harvest.cultivation_id
INNER JOIN classifications classification ON classification.id = harvest.classification_id
INNER JOIN units unit ON unit.id = harvest.unit_id
GROUP BY date;
`;

export const findByField = `
SELECT
harvest.date date,
JSON_AGG(json_build_object(
	'id', harvest.id,
	'quantity', harvest.quantity,
	'inStock', harvest.in_stock,
  	'ruralProperty', json_build_object(
    	'id', rural_property.id,
      	'name', rural_property.name
    ),
  	'field', json_build_object(
   		'id', field.id,
      	'name', field.name
    ),
  	'cultivation', json_build_object(
    	'id', cultivation.id,
      	'name', cultivation.name
    ),
  	'classification', json_build_object(
    	'id', classification.id,
      	'name', classification.name
    ),
  	'unit', json_build_object(
    	'id', unit.id,
      	'abbreviation', unit.abbreviation
    )
)) harvests
FROM harvests harvest
INNER JOIN rural_properties rural_property ON rural_property.id = harvest.rural_property_id
INNER JOIN fields field ON field.id = harvest.field_id
INNER JOIN cultivations cultivation ON cultivation.id = harvest.cultivation_id
INNER JOIN classifications classification ON classification.id = harvest.classification_id
INNER JOIN units unit ON unit.id = harvest.unit_id
WHERE field.id = $1
GROUP BY date;
`;