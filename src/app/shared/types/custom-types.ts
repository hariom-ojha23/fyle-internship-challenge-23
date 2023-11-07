export interface UserData {
    avatar_url: string
    bio: string | null
    blog: string | null
    followers: number
    following: number
    location: string | null
    login: string
    name: string
    public_repos: number,
    html_url: string
}

export interface Repository {
    name: string
    description: string
    html_url: string
    owner: {
        login: string
    }
}

export interface GetRecommendedUserApi {
    login: string
}