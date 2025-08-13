
import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.Controllers";
import { UserService } from "./users.services";
import { mock } from "node:test";
import { equal } from "assert";
import { Controller } from "@nestjs/common";

const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn()
}

describe("User Controller Tests", () => {

    let Controller: UsersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UserService, useValue: mockUserService },
            ],
        }).compile();

        Controller = module.get<UsersController>(UsersController)

    });



    it('deve criar todos os usuário', async () => {
        const dto = { name: "duda", email: "duda01@email.com" }
        const createUsers = { id: "1", ...dto }

        mockUserService.create.mockResolvedValue(createUsers)(dto);

        expect(await Controller.create(dto)).toEqual(createUsers);
        expect(mockUserService.create).toHaveBeenCalledWith(dto);


    })

    it('deve listar todos os usuários', async () => {
        const users = [
            { name: "duda", email: "duda1@email.com" },
            { name: "duda:", email: "duda1@email.com" }
        ]

        mockUserService.findAll.mockResolvedValue(users);

        expect(await Controller.findAll()).toEqual(users)

    })

    it("deve pegar  um  ùnico usuário", async () => {
        const user = { id: "1", name: "julia", email: "julia@email.com" }

        mockUserService.findOne.mockResolvedValue(user);

        expect(await Controller.findOne("1")).toEqual(user)
        expect(mockUserService.findOne).toHaveBeenCalledWith("1");

    })

    it(" deve atualizar o usuário", async () => {
        const dto = {name: "mel"}
        const UpdateUser= { id: "1", name: "mel", email: "mel@email.com"}



        mockUserService.update.mockResolvedValue(UpdateUser);

        expect(await Controller.update("1", dto)).toEqual(UpdateUser)
        expect(mockUserService.update).toHaveBeenCalledWith("1", dto);

    })

    it("deve remover usuário", async () => {
        const user = { id: "1", name: "joão", email: "joãoa@email.com" }

        mockUserService.remove.mockResolvedValue(user);

        expect(await Controller.remove("1")).toEqual(user)
        expect(mockUserService.remove).toHaveBeenCalledWith("1");

    })

})


