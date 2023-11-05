export interface UserData {
    avatar_url: string
    bio: string
    blog: string
    followers: number
    following: number
    location: string
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