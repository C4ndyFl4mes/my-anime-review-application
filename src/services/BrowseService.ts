import Axios from "axios";
import { ResponseHandler } from "../utils/ResponseHandler";
import type { ISearchRes } from "../interfaces/responses/ISearchRes";
import type { IError } from "../interfaces/responses/IError";
import type { IAnime } from "../interfaces/responses/IAnime";

class BrowseService {
    private resHandler = new ResponseHandler();
    private client = Axios.create({
        baseURL: 'https://localhost:8443/api/anime',
        withCredentials: true
    });
    private config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    async Search(query: string, page: number): Promise<ISearchRes | IError> {
        try {
            return this.resHandler.Success<ISearchRes>(
                await this.client.get<ISearchRes>(`/search?q=${encodeURIComponent(query)}&page=${page}`, this.config)
            );
        } catch (e: unknown) {
            return this.resHandler.Failure(e);
        }
    }

    async Inspect(malId: number): Promise<IAnime | IError> {
        try {
            return this.resHandler.Success<IAnime>(
                await this.client.get<IAnime>(`/inspect/${malId}`, this.config)
            );
        } catch (e: unknown) {
            return this.resHandler.Failure(e);
        }
    }
}

export default new BrowseService();