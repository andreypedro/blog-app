class PostsController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :update, :destroy ]
  def index
    @local_posts = Post.page(params[:page]).per(2).order("created_at DESC")
    @remote_posts = NewsApiService.fetch_posts("watches", params[:page], 2)
    @posts = (@local_posts + @remote_posts).compact

    respond_to do |format|
      format.html
      format.json { render json: @posts }
    end
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
      head :no_content
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
