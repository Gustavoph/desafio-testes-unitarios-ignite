import "reflect-metadata";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { Statement } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { IGetStatementOperationDTO } from "./IGetStatementOperationDTO";

let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;

describe('GetStatementOperationUseCase', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    createStatementUseCase = new CreateStatementUseCase(inMemoryUsersRepository,inMemoryStatementsRepository);
  })


  it('Should be able return statement', async () => {
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

    const filterStatement = {
      statement_id: statementCreated.id,
      user_id: statement.user_id
    } as IGetStatementOperationDTO

    const result = await inMemoryStatementsRepository.findStatementOperation(filterStatement) as Statement;

    expect(result.id).toBe(statementCreated.id);
    expect(result.user_id).toBe(statementCreated.user_id);
  })
})
