require 'open-uri'
require 'nokogiri'
require 'json'
require 'time'

URL = "https://www.jogossantacasa.pt/web/SCEstatisticas"

html = URI.open(URL).read
doc = Nokogiri::HTML(html)

def parse_table(doc, selector)
  data = []
  doc.css(selector).each do |row|
    cols = row.css("li").map { |li| li.text.strip }
    next if cols.empty?
    data << {
      number: cols[0].to_i,
      count: cols[1].to_i,
      percent: cols[2].gsub(",", ".").to_f,
      last_draw: cols[3],
      draw_date: cols[4],
      absence: cols[5].to_i
    }
  end
  data
end

numbers = parse_table(doc, ".stripped.betMiddle.sixcol.stats ul.colums")
stars   = parse_table(doc, ".sortTable.tablepad .betMiddle ul.colums")

data = {
  last_updated: Time.now.utc.iso8601,
  numbers: numbers,
  stars: stars
}

File.open("data/stats.json", "w:utf-8") do |f|
  f.write(JSON.pretty_generate(data))
end
