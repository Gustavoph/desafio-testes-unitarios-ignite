import "reflect-metadata";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { ICreateStatementDTO } from "./ICreateStatementDTO";

let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

describe('CreateStatementUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository,inMemoryStatementsRepository);
  })


  it('Should be able a create a new deposit', async () => {
    const user = await createUserUseCase.execute({
      name: 'User test',
      email: 'test@example.com',
      password: 'test@example.com'
    })

    const statement ={
      user_id: user.id,
      type: "deposit",
      amount: 100,
      description: "Test deposit"
    } as ICreateStatementDTO

    const statementCreated = await createStatementUseCase.execute(statement);

    expect(statementCreated).toHaveProperty('id');
    expect(statementCreated).toHaveProperty('user_id');
    expect(statementCreated.type).toBe('deposit');
    expect(statementCreated.amount).toBe(statement.amount);
  })

  it('Should be able a create a new withdraw', async () => {
    const user = await createUserUseCase.execute({
      name: 'User test',
      email: 'test@example.com',
      password: 'test@example.com'
    })

    const deposit ={
      user_id: user.id,
      type: "deposit",
      amount: 100,
      description: "Test deposit"
    } as ICreateStatementDTO

    const withdraw ={
      user_id: user.id,
      type: "withdraw",
      amount: 100,
      description: "Test withdraw"
    } as ICreateStatementDTO

    await createStatementUseCase.execute(deposit);
    const withdrawCreated = await createStatementUseCase.execute(withdraw);

    expect(withdrawCreated).toHaveProperty('id');
    expect(withdrawCreated).toHaveProperty('user_id');
    expect(withdrawCreated.type).toBe('withdraw');
    expect(withdrawCreated.amount).toBe(withdraw.amount);
  })
})
