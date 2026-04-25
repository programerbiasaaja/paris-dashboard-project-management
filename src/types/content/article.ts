export interface IArticleCreatedBy {
    user_id: number;
    user_uid: string;
    user_name: string;
    user_role: string;
}

export interface IArticleBody {
    content: string;
}

export interface IArticleContent {
    id: number;
    uid: string;
    created_on: string;
    created_by: IArticleCreatedBy;
    title: string;
    slug: string;
    short_description: string | null;
    body: IArticleBody;
    gads_script: string | null;
    pixel_script: string | null;
    published_on: string | null;
    type: string;
    worship_category: string | null;
    worship_type: string | null;
    article_category: string | null;
    umrah_procedure_type: string | null;
    status: string;
    tags: string[] | null;
    banner_url: string | null;
    agency_id: number | null;
    agent_name: string | null;
    agent_icon: string | null;
    batch_id: number | null;
    product_id: number | null;
    product_name: string | null;
    product_type: string | null;
}
