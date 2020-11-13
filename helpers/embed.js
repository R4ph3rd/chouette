module.exports = {
    setEmbed : ({title, desc, author, avatar, picture, url}) => {
        return {
          color: 0xd22140,
          title: title,
          // url : url,
          author: {
            name: author,
            icon_url: avatar,
          },
          description: desc,
          thumbnail: {
            url: picture,
          },
          timestamp: new Date(),
      }
    }
}