interface IStockItemDetailsDTO {
  inStock: number;
  
  cultivation: {
    id: string;
    name: string;
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

  origins: Array<{
    ruralProperty: {
      name: string;
    };
    field: {
      name: string;
    };
    harvest: {
      id: string;
      date: Date;
      inStock: number;
    }
  }>;
}

export default IStockItemDetailsDTO;