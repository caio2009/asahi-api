interface IStockItemDTO {
  quantity: number;

  cultivation: {
    id: string;
    name: string;
    image: string;
  };

  classification: {
    id: string;
    name: string;
  };

  unit: {
    id: string;
    name: string;
    abbreviation: string;
  };
}

export default IStockItemDTO;