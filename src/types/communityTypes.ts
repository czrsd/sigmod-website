export interface Tag {
    _id: string;
    name: string;
    slug: string;
    color: string;
}

export interface Tutorial {
    _id: string;
    title: string;
    description: string;
    type: 'youtube' | 'video' | 'image';
    contentUrls: string[];
    authorId: string;
    tags: Tag[];
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}
