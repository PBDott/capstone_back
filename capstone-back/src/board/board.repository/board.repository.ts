import { Board } from "@prisma/client";
import { CreateBoardDto } from "../dto/create-board.dto";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { DeleteBoardDto } from "../dto/delete-board.dto";

export class BoardRepository {
    deleteBoard(deleteBoardDto: DeleteBoardDto) {
        throw new Error("Method not implemented.");
    }
    updateBoard(updateBoardDto: UpdateBoardDto) {
        throw new Error("Method not implemented.");
    }
    createBoard(createBoardDto: CreateBoardDto) {
        throw new Error("Method not implemented.");
    }
    getAll(): PromiseLike<Board[]> {
        throw new Error("Method not implemented.");
    }
}
