import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  async createPost(@Body() body: { userId: number; title: string; description: string; imageUrl: string }) {
    return this.postService.createPost(body.userId, body.title, body.description, body.imageUrl);
  }

  @Post('like')
  async toggleLike(@Body() body: { postId: number; userId: number }) {
    return this.postService.toggleLike(body.postId, body.userId);
  }

  @Get('list')
  async getPosts(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    return this.postService.getPosts(Number(offset), Number(limit)); 
  }
}
