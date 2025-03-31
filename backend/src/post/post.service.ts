import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PostService {
  constructor(private dataSource: DataSource) {}

  async createPost(userId: number, title: string, description: string, imageUrl: string) {
    return this.dataSource.query('CALL usp_createPost(?, ?, ?, ?)', [userId, title, description, imageUrl]);
  }

  async toggleLike(postId: number, userId: number) {
    return this.dataSource.query('CALL usp_togglePostLike(?, ?)', [postId, userId]);
  }

  async getPosts(offset: number, limit: number) {
    return this.dataSource.query('CALL usp_getPosts(?, ?)', [offset, limit]);
  }
}
