var funFactBox = document.querySelector(".funFactBox");
    const funFacts = [
        str1 = "Over 6,000 new computer viruses are created and released every month. 90% of emails contain some form of malware!",        
        str2 = "The Firefox logo isn’t a fox… it’s a red panda!",        
        str3 = "Samsung is 38 years and 1 month older than Apple.",        
        str4 = "One Petabyte (PB) = 1024 (TB). To put this in perspective, a 50PB hard drive could hold the entire written works of mankind from the beginning of recorded history in all languages.",        
        str5 = "Alexa is always listening to your conversations. Alexa stores all of your dialogue history in the cloud to improve the Alexa experience.",        
        str6 = "On average, people read 10% slower from a screen than from paper.",        
        str7 = "The first computer mouse was made in 1964 by Doug Engelbart. It was rectangular and made from wood!!",        
        str8 = "On average, there is only one reply per 12 million spam emails sent.",        
        str9= "Surgeons that grew up playing video games more than three hours per week make 37% fewer errors and have a 42% faster completion rate when performing laparoscopic surgery and suturing.",        
        str10 = "NASA’s internet speed is 91 GB per second.",        
        str11 = "Until 2010, carrier pigeons were faster than the internet.",        
        str12 = " In 1971, the first ever computer virus was developed. Named Creeper, it was made as an experiment just to see how it spread between computers. The virus simply displayed the message: “I’m the creeper, catch me if you can!”",         
        str13 = "Nintendo was founded in 1889 as a playing card company. They didn’t make their first video game until 1978.",
        str14 = "There are approximately 3.5 billion Google Searches per day.",
        str15 = "Google's First Tweet was in binary.",
        str16="Motorola produced the first handheld mobile phone.",
        str17="Apple were originally designing an apple shaped flip phone!",
        str18="Nokia used to sell toilet paper before they started selling phones!",
        str19="More people have mobile phones than toilets",
        str20="The most-viewed video on YouTube is 'Despacito' ",
        str21 = "The QWERTY keyboard(the keyboard all our devices use) was designed to slow you down.",

    ]
    
    let randomNumber = Math.floor(Math.random() * 20);
    let stringFunFact = funFacts[randomNumber];
    funFactBox.innerHTML = '<h1>Fun fact !</h1><br>'+ stringFunFact;
