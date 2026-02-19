import fs from "fs";

const handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return global.dfail?.('group', m, conn)
  if (!isAdmin) return global.dfail?.('admin', m, conn)
  if (!isBotAdmin) return global.dfail?.('botAdmin', m, conn)

  const target = (m.mentionedJid && m.mentionedJid.length)
    ? m.mentionedJid[0]
    : m.quoted?.sender

  // Cargar imagen desde URL
  const imageUrl = 'https://iili.io/q3dNOdB.jpg';
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const thumb = Buffer.from(arrayBuffer);

  // Crear mensaje de contacto falso
  const fkontak = {
    key: { 
      participants: "0@s.whatsapp.net", 
      remoteJid: "status@broadcast", 
      fromMe: false, 
      id: "Juankick" 
    },
    message: {
      locationMessage: {
        name: "꠹ꪊꪖꪀ 𝔟𝔬𝔱 🍷",
        jpegThumbnail: thumb
      }
    }
  };

  if (!target) {
    const aviso = '*📣 𝔪𝔢𝔫𝔠𝔦𝔬𝔫𝔞 𝔬 𝔯𝔢𝔰𝔭𝔬𝔫𝔡𝔢 𝔞𝔩 𝔲𝔰𝔲𝔞𝔯𝔦𝔬 𝔮𝔲𝔢 𝔡𝔢𝔰𝔢𝔞𝔰 𝔢𝔩𝔦𝔪𝔦𝔫𝔞𝔯*'
    return conn.sendMessage(m.chat, {
      text: aviso,
      mentions: []
    }, { quoted: fkontak })
  }

  try {
    await conn.groupParticipantsUpdate(m.chat, [target], 'remove')
    await conn.sendMessage(m.chat, {
      text: '*✅ 𝔘𝔰𝔢𝔯 𝔢𝔩𝔦𝔪𝔦𝔫𝔞𝔡𝔬*',
      mentions: [target]
    }, { quoted: fkontak })
  } catch (error) {
    console.error('Error al eliminar usuario:', error)
    return conn.sendMessage(m.chat, {
      text: '*❌ 𝙴𝚁𝚁𝙾𝚁: 𝙽𝚘 𝚜𝚎 𝚙𝚞𝚍𝚘 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚛 𝚊𝚕 𝚞𝚜𝚞𝚊𝚛𝚒𝚘*',
      mentions: []
    }, { quoted: fkontak })
  }
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = ['kick']
handler.customPrefix = /^\.?/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
