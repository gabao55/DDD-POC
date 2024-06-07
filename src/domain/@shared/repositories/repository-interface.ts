export default interface RepositoryInterface<T> {

    create(entity: T): Promise<void>;
    findById(id: string): Promise<T> | Promise<undefined>;
    update(entity: T): Promise<void>;
    findAll(): Promise<T[]>;

}