const Canvas = require("canvas");
const Discord = require("discord.js")

const background = "https://i.pinimg.com/originals/19/0c/10/190c10845e20ac267d6e7d098cabc9e0.jpg";

const dim = {
  height : 1200,
  width : 1920,
  margin : 50
}

const av = {
  size: 256,
  x: 860, 
  y : 450
}

const generateImage = async (member) => {
  let username = member.user.username;
  let discrim = member.user.discriminator;
  let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: true, size: av.size})

  const canvas = Canvas.createCanvas(dim.width, dim.height);
  const ctx = canvas.getContext("2d");

  //draw background
  const backimg = await Canvas.loadImage(background);
  ctx.drawImage(backimg, 0, 0);

  // black tinted box
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height.height - 2 * dim.margin);

  const avimg = await Canvas.loadImage(avatarURL);
  ctx.save();
  ctx.beginPath();
  ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avimg, av.x, av.y);
  ctx.restore();

  //write in text
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  // draw in welcome
  ctx.font = "80px Arial";
  ctx.fillText("Welcome", dim.width / 2, dim.margin + 70);

  //draw username
  ctx.font = "90px Arial";
  ctx.fillText(username + discrim, dim.width / 2,dim.height - dim.margin - 175);

  ctx.font = "70px Arial";
  ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 75);


  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");
  return attachment;

};

module.exports = generateImage;
