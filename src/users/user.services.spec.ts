import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./users.services";
import { PrismaService } from "../prisma/prisma.service";
import { NotFoundException } from "@nestjs/common";


// Mock do PrismaService
// Aqui estamos criando um mock do PrismaService para simular as operações de banco de dados
const mockPrisma = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

// Testes para o UsersService
// Aqui estamos criando uma suite de testes para o UsersService, que é responsável por gerenciar usuários
// Usamos o Jest para criar mocks e verificar se as funções estão sendo chamadas corretamente
describe("UsersService", () => {
  let service: UserService;

  // Antes de cada teste, criamos uma instância do UsersService com o PrismaService mockado
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // Testes individuais
  // Aqui definimos os testes individuais para cada funcionalidade do UsersService
  it("deve criar um usuário", async () => {
    const dto = { name: "Jonas", email: "jonas@example.com", password: "123" };
    mockPrisma.user.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
  });

  it("deve listar todos os usuários", async () => {
    const List = [
      { id: 1, name: "duda", email: "duda@email.com" },
      { id: 2, name: "tina", email: "tina@email.com" }
    ]

    mockPrisma.user.findMany.mockResolvedValue(List);

    const result = await service.findAll();
    expect(result).toEqual(List);
    expect(mockPrisma.user.create).toHaveBeenCalled();
  });


  it("deve criar um usúario unico", async () => {
    const id = "1"
    const usuárioUnico = { id: "1", name: "duda", email: "duda@email.com" }

    mockPrisma.user.findUnique.mockResolvedValue(usuárioUnico);
    const result = await service.findOne(id)

    expect(result).toEqual(usuárioUnico);
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id }
    })
  });

  it("deve atualizar o usuário", async () => {
    const id = "1"
    const atualizar = { id: "1", name: "nick", email: "nick@email.com" }

    mockPrisma.user.update.mockResolvedValue(atualizar);
    const result = await service.update(id, atualizar)
    expect(result).toEqual(atualizar);
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: { id },
      data: atualizar
    })


  })

  it("deve deletar usuário", async () => {
    const id = "1"
    const apagar = { id: "1", name: "maria", email: "maria@email.com" }
    
    mockPrisma.user.findUnique.mockResolvedValue(id)
    mockPrisma.user.delete.mockResolvedValue(apagar)

    const result = await service.remove(id)
    expect(result).toEqual(apagar);
    expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: { id }
    })
  })


});



// Executar os  testes: npm test

// 02. teste para o método UseerService. findAll