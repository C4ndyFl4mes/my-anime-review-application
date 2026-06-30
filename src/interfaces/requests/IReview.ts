export interface IReview {
    id: string;
    userId: string;
    text: string;
    score: number;
    username: string;
    profileImageURL: string;
    createdAt: string;
    updatedAt: string;
    helpFulCount: number;
    isHelpfulByCurrentUser: boolean;
}