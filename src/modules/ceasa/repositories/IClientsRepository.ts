import Client from "../infra/typeorm/entities/Client";

interface IClientsRepository {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client | undefined>;
  findByIdOrFail(id: string): Promise<Client>;
  findByName(name: string): Promise<Client>;
  save(data: Client): Promise<Client>;
  delete(id: string): Promise<void>;
}

export default IClientsRepository;