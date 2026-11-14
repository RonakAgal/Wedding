import { WEDDING_EVENTS, VENUE_DETAILS, FAMILY_DETAILS } from '../data/weddingData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  image?: string;
  audioUrl?: string;
  audioDuration?: string;
  isVoice?: boolean;
}

const SYSTEM_PROMPT = `
You are "Shahi Sahayak" (शाही सहायक), the graceful, hospitable, and knowledgeable Royal Wedding Concierge for the wedding celebration of Himanshi Agal (हिमांशी आगाल) and Gagan Baheti (गगन बाहेती) taking place in Udaipur, Rajasthan on 11th & 12th December 2026.

Your Persona & Tone:
- Royal, respectful, warm, and joyful Rajasthani hospitality (Mewari & Marwari culture).
- Greet guests with "खम्मा घणी सा! 🙏" (Khammaghani Sa) or "सादर प्रणाम / Namaste".
- Speak in natural, friendly Hinglish, Hindi, or English according to the guest's language.
- Use elegant bullet points and appropriate wedding emojis (⚜️, 🌸, 🪔, 💍, 🏰, ✨).
- Always be helpful, concise, and accurate about timings, dress codes, venues, and contacts.

Verified Wedding Details:
1. Couple:
   - Bride: Himanshi Agal (हिमांशी आगाल)
   - Bride's Parents: Shri Gopal Lal Agal & Smt. Shanta Devi Agal (श्री गोपाल लाल आगाल एवं श्रीमती शांता देवी आगाल)
   - Groom: Gagan Baheti (गगन बाहेती)
   - Groom's Parents: Shri Gopal Swaroop Baheti & Smt. Upasana Baheti (श्री गोपाल स्वरूप बाहेती एवं श्रीमती उपासना बाहेती)

2. Venue & Accommodation:
   - Celebration Garden (All Wedding Functions & Rituals):
     Swarn Jayanti Park, Goverdhan Sagar Ring Rd, Udaipur, Rajasthan 313002.
     Map: ${VENUE_DETAILS.mapLink}
   - Luxury Hotel (Guest Stay & Hospitality):
     Perfectstayz Premium Udaipur By The Lake, Goverdhan Sagar, Udaipur 313002.
   - Travel Connectivity:
     - Udaipur Railway Station: 2.5 km
     - Udaipur Bus Stand: 3 km
     - Maharana Pratap Airport: 24 km
     - Expected Weather: Pleasant winter weather (22°C day, 12°C evening).

3. Complete Itinerary (8 Auspicious Ceremonies):
   - Day 1 (Friday, 11 December 2026):
     1. Ganpati Sthapana - 09:30 AM Onwards. Dress: Traditional Yellow / Kesariya Attire.
     2. Kalash Yatra - 10:30 AM Onwards. Dress: Traditional Marwari Ethnic.
     3. Wedding Carnival & Mela - 01:30 PM Onwards. Dress: Bright & Pastel Festive Chic.
     4. Ring Ceremony & Disco wali raat (DJ NIGHT) - 07:00 PM Onwards. Dress: Glamorous Indo-Western / Party Wear.
   - Day 2 (Saturday, 12 December 2026):
     5. Shubh Mayra (Bhaat) - 09:30 AM Onwards. Dress: Traditional Rajputi Poshak / Kurta Pajama.
     6. Shahi Barat Swagat - 06:30 PM Onwards. Dress: Royal Safa, Turbans & Traditional Sherwani.
     7. Grand Royal Reception & Varmala - 07:30 PM Onwards. Dress: Royal Ethnic / Jodhpuri Bandgala & Lehengas.
     8. Mangal Phere (Shubh Vivah) - Late night 12 Dec / 13 Dec early morning 03:00 AM Onwards. Dress: Sacred Traditional Vivah Attire.

4. Family Helplines (Click to Call):
   - Agal Family (Bride's side Helpline): +91 93516 89814
   - Baheti Family (Groom's side Helpline): +91 96021 62256

5. Wishes & Shayari:
   - If asked to write wishes or congratulations for Himanshi & Gagan, generate beautiful, poetic, heartfelt blessings blending romantic and traditional Rajasthani elegance.
`;

// Smart Local Fallback Knowledge Engine (Fast, 100% reliable)
export function getSmartLocalResponse(query: string, lang: 'hi' | 'en' = 'hi'): string {
  const q = query.toLowerCase().trim();

  // English Local Responses
  if (lang === 'en') {
    // Greetings
    if (/^(hi|hello|hey|namaste|khammaghani|pranam|ram ram|jai shree krishna|radhe radhe)/i.test(q)) {
      return `Khamma Ghani Sa! 🙏 Warm welcome to the royal wedding celebrations of Himanshi Agal & Gagan Baheti.\n\nI am your **Royal Concierge**. How may I assist you with ceremonies, schedule, dress codes, venue directions, or family helplines? ⚜️✨`;
    }

    // Helplines & Contacts
    if (q.includes('help') || q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('mobile')) {
      return `📞 **Royal Wedding Family Helplines:**\n\n• **Agal Family (Bride's Side Helpline):** +91 93516 89814\n• **Baheti Family (Groom's Side Helpline):** +91 96021 62256\n\nPlease feel free to call directly for any travel or hospitality assistance! 🙏`;
    }

    // Venue & Hotel & Map
    if (q.includes('venue') || q.includes('location') || q.includes('kahan') || q.includes('address') || q.includes('hotel') || q.includes('stay') || q.includes('map') || q.includes('park') || q.includes('rasta') || q.includes('route')) {
      return `🏰 **Royal Venue & Hospitality Details:**\n\n• **Celebration Garden (All Functions):**\n  *Swarn Jayanti Park*, Goverdhan Sagar Ring Rd, Udaipur, Rajasthan 313002.\n  [Google Maps Link](${VENUE_DETAILS.mapLink})\n\n• **Guest Luxury Stay:**\n  *Perfectstayz Premium Udaipur By The Lake*, Goverdhan Sagar.\n\n• **Distances:**\n  - Udaipur Railway Station: 2.5 km\n  - Udaipur Bus Stand: 3 km\n  - Maharana Pratap Airport: 24 km`;
    }

    // Travel & Distance
    if (q.includes('airport') || q.includes('station') || q.includes('railway') || q.includes('bus') || q.includes('distance') || q.includes('weather') || q.includes('mausam')) {
      return `✈️ **Travel Connectivity & Weather Guide:**\n\n• Udaipur Railway Station: **2.5 km**\n• Udaipur Central Bus Stand: **3 km**\n• Maharana Pratap Airport: **24 km**\n• Weather: Pleasant winter breeze (22°C day, 12°C evening - a light warm shawl or jacket is recommended) 🌤️`;
    }

    // Schedule / Complete Itinerary
    if (q.includes('schedule') || q.includes('program') || q.includes('functions') || q.includes('timing') || q.includes('itinerary') || (q.includes('kab') && q.includes('kya'))) {
      return `🗓️ **Royal Wedding Schedule (Complete Itinerary):**\n\n**Day 1 (Friday, 11 December 2026):**\n1. 🪔 Ganpati Sthapana - 09:30 AM onwards\n2. 🏺 Kalash Yatra - 10:30 AM onwards\n3. 🎪 Wedding Carnival & Fair - 01:30 PM onwards\n4. 💍 Ring Ceremony & DJ Night - 07:00 PM onwards\n\n**Day 2 (Saturday, 12 December 2026):**\n5. 👑 Shubh Mayra (Bhaat) - 09:30 AM onwards\n6. 🐎 Royal Barat Welcome - 06:30 PM onwards\n7. 👑 Royal Reception & Varmala - 07:30 PM onwards\n8. 🔥 Sacred Mangal Pheras - Late night 03:00 AM (13 Dec) onwards`;
    }

    // Specific Ceremony: Ganpati
    if (q.includes('ganpati') || q.includes('ganesh') || q.includes('sthapana')) {
      return `🪔 **Ganpati Sthapana:**\n\n• **Date:** Friday, 11 December 2026\n• **Time:** 09:30 AM Onwards\n• **Venue:** Swarn Jayanti Park, Goverdhan Sagar, Udaipur\n• **Dress Code:** Traditional Yellow / Kesariya Attire 💛`;
    }

    // Specific Ceremony: Kalash Yatra
    if (q.includes('kalash') || q.includes('yatra')) {
      return `🏺 **Kalash Yatra:**\n\n• **Date:** Friday, 11 December 2026\n• **Time:** 10:30 AM Onwards\n• **Venue:** Swarn Jayanti Park, Goverdhan Sagar\n• **Dress Code:** Traditional Marwari Ethnic 🌸`;
    }

    // Specific Ceremony: Carnival
    if (q.includes('carnival') || q.includes('mela') || q.includes('game') || q.includes('chaat')) {
      return `🎪 **Wedding Carnival & Festive Fair:**\n\n• **Date:** Friday, 11 December 2026\n• **Time:** 01:30 PM Onwards\n• **Highlights:** Live street chaat, interactive games & musical vibes\n• **Dress Code:** Bright & Pastel Festive Chic 🎨`;
    }

    // Specific Ceremony: Ring Ceremony / DJ Night
    if (q.includes('dj') || q.includes('ring') || q.includes('sangeet') || q.includes('disco') || q.includes('dance')) {
      return `💍 **Ring Ceremony & DJ Celebration Night:**\n\n• **Date:** Friday, 11 December 2026\n• **Time:** 07:00 PM Onwards\n• **Highlights:** Ring exchange, family dance performances & high-energy DJ\n• **Dress Code:** Glamorous Indo-Western / Party Wear ✨`;
    }

    // Specific Ceremony: Mayra / Bhaat
    if (q.includes('mayra') || q.includes('bhaat') || q.includes('chunari') || q.includes('nanihal')) {
      return `👑 **Shubh Mayra (Auspicious Bhaat Ceremony):**\n\n• **Date:** Saturday, 12 December 2026\n• **Time:** 09:30 AM Onwards\n• **Highlights:** Warm Nanihal welcome, Shagun Chunari & traditional Mayra\n• **Dress Code:** Traditional Rajputi Poshak / Kurta Pajama 🌺`;
    }

    // Specific Ceremony: Barat
    if (q.includes('barat') || q.includes('baraat') || q.includes('toran') || q.includes('swagat')) {
      return `🐎 **Royal Barat Procession & Toran Ceremony:**\n\n• **Date:** Saturday, 12 December 2026\n• **Time:** 06:30 PM Onwards\n• **Highlights:** Dhol nagada, royal safas, fireworks & grand gate welcome\n• **Dress Code:** Royal Safa, Turbans & Traditional Sherwani 🚩`;
    }

    // Specific Ceremony: Reception / Varmala
    if (q.includes('reception') || q.includes('varmala') || q.includes('bhoj') || q.includes('preeti')) {
      return `👑 **Grand Royal Reception & Varmala Mahotsav:**\n\n• **Date:** Saturday, 12 December 2026\n• **Time:** 07:30 PM Onwards\n• **Highlights:** Royal stage Varmala, couple blessings & Mewari royal feast\n• **Dress Code:** Royal Ethnic / Jodhpuri Bandgala & Lehengas ⚜️`;
    }

    // Specific Ceremony: Phere
    if (q.includes('phere') || q.includes('vivah') || q.includes('saat phere') || q.includes('shadi')) {
      return `🔥 **Sacred Mangal Pheras (Shubh Vivah):**\n\n• **Date:** Late night 12 Dec / 13 Dec early morning\n• **Time:** 03:00 AM Onwards\n• **Highlights:** Vedic Vedic chants, seven holy vows, Kanyadan & Sindoor daan\n• **Dress Code:** Sacred Traditional Vivah Attire 🪔`;
    }

    // Dress Codes General
    if (q.includes('dress') || q.includes('kapde') || q.includes('pehanna') || q.includes('attire') || q.includes('outfit')) {
      return `👗 **Royal Wedding Dress Code Guide:**\n\n• **Ganpati Sthapana:** Traditional Yellow / Kesariya\n• **Kalash Yatra:** Traditional Marwari Ethnic\n• **Carnival & Fair:** Bright & Pastel Festive Chic\n• **DJ Night & Ring Ceremony:** Glamorous Indo-Western / Party Wear\n• **Shubh Mayra:** Traditional Rajputi Poshak / Kurta Pajama\n• **Barat Swagat:** Royal Safa & Traditional Sherwani\n• **Reception:** Royal Ethnic / Bandgala & Lehengas\n• **Mangal Pheras:** Sacred Traditional Vivah Attire`;
    }

    // Bride / Groom / Parents
    if (q.includes('bride') || q.includes('groom') || q.includes('himanshi') || q.includes('gagan') || q.includes('parents') || q.includes('mata') || q.includes('pita') || q.includes('parivar') || q.includes('family')) {
      return `💑 **Royal Couple & Families:**\n\n• **Bride:** Himanshi Agal (Daughter of Shri Gopal Lal Agal & Smt. Shanta Devi Agal)\n• **Groom:** Gagan Baheti (Son of Shri Gopal Swaroop Baheti & Smt. Upasana Baheti)\n\nBoth families eagerly look forward to welcoming you in Udaipur! ⚜️`;
    }

    // Wishes / Shayari
    if (q.includes('wish') || q.includes('shayari') || q.includes('badhai') || q.includes('bless') || q.includes('mubarak') || q.includes('congrat')) {
      return `💖 **Heartfelt Blessings for Himanshi & Gagan:**\n\n*"May your sacred union be showered with eternal joy, warmth, and laughter.\nTogether in love, trust, and companionship forever!"*\n\n🌹 **Heartiest Congratulations to the Couple!**\nYou can also submit your wishes and photo blessings directly in our Wedding Guestbook! ✨`;
    }

    // Default intelligent response in English
    return `Khamma Ghani Sa! 🙏 How may I assist you today?\n\nYou can ask me:\n• 🗓️ *Wedding schedule and ceremonies*\n• 👗 *Dress code for any function*\n• 📍 *Swarn Jayanti Park venue route and map*\n• 📞 *Agal or Baheti family helpline numbers*\n• 💌 *Wedding wishes & blessings for the couple*`;
  }

  // Hindi Responses
  // Greetings
  if (/^(hi|hello|hey|namaste|khammaghani|pranam|ram ram|jai shree krishna|radhe radhe)/i.test(q)) {
    return `खम्मा घणी सा! 🙏 हार्दिक स्वागत है आपका हिमांशी एवं गगन के शुभ विवाह उत्सव में।\n\nमैं आपका "शाही सहायक" हूँ। आप मुझसे किसी भी रस्म की टाइमिंग, ड्रेस कोड, वेन्यू का रास्ता, या फैमिली हेल्पलाइन के बारे में पूछ सकते हैं! ✨`;
  }

  // Helplines & Contacts
  if (q.includes('help') || q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('mobile')) {
    return `📞 **शाही विवाह हेल्पलाइन संपर्क:**\n\n• **आगाल परिवार (वधु पक्ष):** +91 93516 89814\n• **बाहेती परिवार (वर पक्ष):** +91 96021 62256\n\nकिसी भी सहायता या जानकारी के लिए आप इन नंबरों पर संपर्क कर सकते हैं! 🙏`;
  }

  // Venue & Hotel & Map
  if (q.includes('venue') || q.includes('location') || q.includes('kahan') || q.includes('address') || q.includes('hotel') || q.includes('stay') || q.includes('map') || q.includes('park') || q.includes('rasta')) {
    return `🏰 **शाही वेन्यू एवं स्टे की जानकारी:**\n\n• **विवाह स्थल (सभी रस्में):**\n  *Swarn Jayanti Park*, Goverdhan Sagar Ring Rd, Udaipur, Rajasthan 313002.\n  [Google Maps Link](${VENUE_DETAILS.mapLink})\n\n• **गेस्ट स्टे (Luxury Hotel):**\n  *Perfectstayz Premium Udaipur By The Lake*, Goverdhan Sagar.\n\n• **दूरी (Distance):**\n  - रेलवे स्टेशन: 2.5 km\n  - बस स्टैंड: 3 km\n  - एयरपोर्ट: 24 km`;
  }

  // Travel & Distance
  if (q.includes('airport') || q.includes('station') || q.includes('railway') || q.includes('bus') || q.includes('distance') || q.includes('weather') || q.includes('mausam')) {
    return `✈️ **ट्रैवल एवं मौसम जानकारी:**\n\n• रेलवे स्टेशन (Udaipur Stn): **2.5 km**\n• बस स्टैंड (Udaipur Stand): **3 km**\n• महाराणा प्रताप एयरपोर्ट: **24 km**\n• मौसम: सुहावना (22°C दिन, 12°C रात - हल्की गर्म शॉल या जैकेट साथ रखें) 🌤️`;
  }

  // All Functions Schedule
  if (q.includes('schedule') || q.includes('program') || q.includes('functions') || q.includes('timing') || q.includes('itinerary') || (q.includes('kab') && q.includes('kya'))) {
    return `🗓️ **शुभ विवाह कार्यक्रम (Complete Itinerary):**\n\n**दिन 1 (11 दिसंबर 2026, शुक्रवार):**\n1. गणपति स्थापना - 09:30 AM onwards\n2. कलश यात्रा - 10:30 AM onwards\n3. वेडिंग कार्निवल व मेला - 01:30 PM onwards\n4. रिंग सेरेमनी व DJ नाइट - 07:00 PM onwards\n\n**दिन 2 (12 दिसंबर 2026, शनिवार):**\n5. शुभ मायरा (भात) - 09:30 AM onwards\n6. शाही बारात स्वागत - 06:30 PM onwards\n7. शाही रिसेप्शन व वरमाला - 07:30 PM onwards\n8. पावन मंगल फेरे - देर रात 03:00 AM (13 Dec) onwards`;
  }

  // Specific Ceremony: Ganpati
  if (q.includes('ganpati') || q.includes('ganesh') || q.includes('sthapana')) {
    return `🪔 **गणपति स्थापना (Ganpati Sthapana):**\n\n• **तारीख:** शुक्रवार, 11 दिसंबर 2026\n• **समय:** सुबह 09:30 बजे से\n• **वेन्यू:** Swarn Jayanti Park, Goverdhan Sagar, Udaipur\n• **ड्रेस कोड:** Traditional Yellow / Kesariya Attire 💛`;
  }

  // Specific Ceremony: Kalash Yatra
  if (q.includes('kalash') || q.includes('yatra')) {
    return `🏺 **कलश यात्रा (Kalash Yatra):**\n\n• **तारीख:** शुक्रवार, 11 दिसंबर 2026\n• **समय:** सुबह 10:30 बजे से\n• **वेन्यू:** Swarn Jayanti Park\n• **ड्रेस कोड:** Traditional Marwari Ethnic 🌸`;
  }

  // Specific Ceremony: Carnival
  if (q.includes('carnival') || q.includes('mela') || q.includes('game') || q.includes('chaat')) {
    return `🎪 **वेडिंग कार्निवल एवं आनंद मेला:**\n\n• **तारीख:** शुक्रवार, 11 दिसंबर 2026\n• **समय:** दोपहर 01:30 बजे से\n• **हाइलाइट्स:** स्वादिष्ट चाट-चौपाटी, गेम्स और फैमिली सेलिब्रेशन\n• **ड्रेस कोड:** Bright & Pastel Festive Chic 🎨`;
  }

  // Specific Ceremony: Ring Ceremony / DJ Night
  if (q.includes('dj') || q.includes('ring') || q.includes('sangeet') || q.includes('disco') || q.includes('dance')) {
    return `💍 **रिंग सेरेमनी एवं डिस्को वाली रात (DJ NIGHT):**\n\n• **तारीख:** शुक्रवार, 11 दिसंबर 2026\n• **समय:** सायं 07:00 बजे से\n• **हाइलाइट्स:** सगाई, डांस परफॉरमेंस और डीजे बीट्स\n• **ड्रेस कोड:** Glamorous Indo-Western / Party Wear ✨`;
  }

  // Specific Ceremony: Mayra / Bhaat
  if (q.includes('mayra') || q.includes('bhaat') || q.includes('chunari') || q.includes('nanihal')) {
    return `👑 **शुभ मायरा (भात की पावन रस्म):**\n\n• **तारीख:** शनिवार, 12 दिसंबर 2026\n• **समय:** सुबह 09:30 बजे से\n• **हाइलाइट्स:** ननिहाल पक्ष का आगमन, शगुन की चुनरी व मंगल मायरा\n• **ड्रेस कोड:** Traditional Rajputi Poshak / Kurta Pajama 🌺`;
  }

  // Specific Ceremony: Barat
  if (q.includes('barat') || q.includes('baraat') || q.includes('toran') || q.includes('swagat')) {
    return `🐎 **शाही बारात स्वागत एवं तोरण रस्म:**\n\n• **तारीख:** शनिवार, 12 दिसंबर 2026\n• **समय:** सायं 06:30 बजे से\n• **हाइलाइट्स:** ढोल-धमाके, आतिशबाजी, साफा और तोरण रस्म\n• **ड्रेस कोड:** Royal Safa, Turbans & Traditional Sherwani 🚩`;
  }

  // Specific Ceremony: Reception / Varmala
  if (q.includes('reception') || q.includes('varmala') || q.includes('bhoj') || q.includes('preeti')) {
    return `👑 **शाही रिसेप्शन एवं वरमाला महोत्सव:**\n\n• **तारीख:** शनिवार, 12 दिसंबर 2026\n• **समय:** सायं 07:30 बजे से\n• **हाइलाइट्स:** शाही वरमाला, नव-दम्पति आशीर्वाद व राजसी मेवाड़ी भोज\n• **ड्रेस कोड:** Royal Ethnic / Jodhpuri Bandgala & Lehengas ⚜️`;
  }

  // Specific Ceremony: Phere
  if (q.includes('phere') || q.includes('vivah') || q.includes('saat phere') || q.includes('shadi')) {
    return `🔥 **पावन मंगल फेरे (Shubh Vivah):**\n\n• **तारीख:** 12 दिसंबर की देर रात / 13 दिसंबर प्रातः काल\n• **समय:** प्रातः 03:00 बजे से (03:00 AM Onwards)\n• **हाइलाइट्स:** वैदिक मंत्रोच्चार, सात फेरे, कन्यादान एवं सिंदूरदान\n• **ड्रेस कोड:** Sacred Traditional Vivah Attire 🪔`;
  }

  // Dress Codes General
  if (q.includes('dress') || q.includes('kapde') || q.includes('pehanna') || q.includes('attire') || q.includes('outfit')) {
    return `👗 **शाही समारोह ड्रेस कोड गाइड:**\n\n• **गणपति स्थापना:** Traditional Yellow / Kesariya\n• **कलश यात्रा:** Traditional Marwari Ethnic\n• **कार्निवल व मेला:** Bright & Pastel Festive Chic\n• **DJ नाइट / रिंग सेरेमनी:** Glamorous Indo-Western / Party Wear\n• **शुभ मायरा:** Traditional Rajputi Poshak / Kurta Pajama\n• **बारात स्वागत:** Royal Safa & Traditional Sherwani\n• **रिसेप्शन:** Royal Ethnic / Bandgala & Lehengas\n• **मंगल फेरे:** Sacred Traditional Vivah Attire`;
  }

  // Bride / Groom / Parents
  if (q.includes('bride') || q.includes('groom') || q.includes('himanshi') || q.includes('gagan') || q.includes('parents') || q.includes('mata') || q.includes('pita') || q.includes('parivar') || q.includes('family')) {
    return `💑 **शाही दम्पति एवं परिवार:**\n\n• **दुल्हन:** हिमांशी आगाल (सुपुत्री: श्री गोपाल लाल आगाल एवं श्रीमती शांता देवी आगाल)\n• **दूल्हा:** गगन बाहेती (सुपुत्र: श्री गोपाल स्वरूप बाहेती एवं श्रीमती उपासना बाहेती)\n\nदोनों परिवार उदयपुर में आपके पधारने की प्रतीक्षा कर रहे हैं! ⚜️`;
  }

  // Wishes / Shayari
  if (q.includes('wish') || q.includes('shayari') || q.includes('badhai') || q.includes('bless') || q.includes('mubarak') || q.includes('congrat')) {
    return `💖 **हिमांशी एवं गगन के लिए शुभ आशीष:**\n\n*"दीपों की तरह जगमगाता रहे आपका जीवन,\nखुशियों से भरा रहे हर एक क्षण।\nसात जन्मों के अटूट बंधन में बंधे आप दोनों,\nसदा बना रहे प्यार और अपनों का समर्पण!"*\n\n🌹 **शुभ विवाह हिमांशी एवं गगन!**\nआप वेबसाइट के 'Guestbook' सेक्शन में भी अपनी शुभकामनाएं व फोटो संदेश भेज सकते हैं! ✨`;
  }

  // Default intelligent response in Hindi (Pure Hindi)
  return `खम्मा घणी सा! 🙏 मैं आपकी क्या सेवा कर सकता हूँ?\n\nआप मुझसे इन मुख्य विषयों पर पूछ सकते हैं:\n• 🗓️ *विवाह के कार्यक्रमों का समय एवं विवरण*\n• 👗 *सभी रस्मों का ड्रेस कोड*\n• 📍 *स्वर्ण जयंती पार्क वेन्यू की लोकेशन व मैप*\n• 📞 *आगाल एवं बाहेती परिवार के हेल्पलाइन नंबर*\n• 💌 *वर-वधु के लिए मंगलकामनाएं व शायरी*`;
}

// Full Generative AI caller with Gemini API
export async function sendChatMessageToGemini(
  userMessage: string,
  history: ChatMessage[] = [],
  lang: 'hi' | 'en' = 'hi'
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // If no API key or invalid format, immediately use high-quality local knowledge base
  if (!apiKey || apiKey === 'your-gemini-api-key') {
    return getSmartLocalResponse(userMessage, lang);
  }

  try {
    const langInstruction =
      lang === 'en'
        ? '[Language Directive]: Please respond in polite, elegant English with royal Rajasthani warmth and auspicious emojis.'
        : '[Language Directive]: कृपया आदरणीय एवं शुद्ध हिंदी / राजस्थानी शैली में उत्तर दें।';

    // Format conversation history for Gemini API
    const contents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\n${langInstruction}\n\n[Guest Question]: ${userMessage}` }],
      },
    ];

    // If there is prior conversation history (last 4 messages for context)
    const recentHistory = history.slice(-4);
    if (recentHistory.length > 0) {
      const formattedHistory = recentHistory.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));
      contents.unshift(...formattedHistory);
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      return getSmartLocalResponse(userMessage, lang);
    }

    const data = await response.json();
    const candidateText =
      data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (candidateText.trim()) {
      return candidateText.trim();
    }

    return getSmartLocalResponse(userMessage, lang);
  } catch {
    return getSmartLocalResponse(userMessage, lang);
  }
}
