require "net/http"
require "json"

class NewsApiService
  API_URL = "https://newsapi.org/v2/everything".freeze
  API_KEY = ENV["NEWS_API_KEY"]

  def self.fetch_posts(keyword = "watches", page = 1, page_size = 2)
    uri = URI("#{API_URL}?q=#{keyword}&apiKey=#{API_KEY}&page=#{page}&pageSize=#{page_size}")
    response = Net::HTTP.get(uri)
    articles = JSON.parse(response)["articles"] rescue []
    articles || []
  end
end
