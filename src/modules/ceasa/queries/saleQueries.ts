const findAll = `
SELECT
  sale.date,
  JSON_AGG(json_build_object(
  	'id', sale.id,
    'number', sale.number,
    'totalValue', sale.total_value,
    'paymentStatus', sale.payment_status,
    'deliveryStatus', sale.delivery_status,
    'clientName', sale.client_name,
    'client', json_build_object(
      'id', client.id,
      'name', client.name  
    )
  ) ORDER BY sale.number DESC) sales
FROM sales sale
LEFT JOIN clients client ON client.id = sale.client_id
GROUP BY sale.date
ORDER BY sale.date DESC;
`;

export default { findAll };