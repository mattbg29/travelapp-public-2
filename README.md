# Welcome
This is my first React App.  I've learned a great deal about React from a variety of sources (see Acknowledgement section), and wanted to put my knowledge into practice by building a simple yet very functional application.

The main purpose of this app was to give me a chance to try out my skills.  But it does in fact serve another purpose, which over time I hope to build on - as a one-stop shop for helping users determine where to travel for their next vacation.

This application makes that determination by offering users the ability to enter their target month of travel, target temperature, and minimum country safety threshold.  It then tells the user what the top cities are to venture to.

The default country safety rankings come from travelsafe-abroad.com.  Users can login and then store their own country safety ratings and compare these to the other website's.  At this time, users can only leverage the website's safety rankings when fitering for where to travel. 

# Next steps
Currently users cannot leverage their own data for the top cities to visit section.  I'd like enable this function

I'd like to connect this website to an API where users can enter their travel dates and desired locations and the API will pull price data.  This might be difficult to implement because most of these travel APIs require payment.  

This application is currently built for users who are planning a trip far in the future.  But what if I want to travel later this week anywhere within a 4-hour fight for under $500 where the weather forecast is great?  Tackling this question was the original premise behing this application.  Again it could be complicated by the fact that these flight and weather forecast APIs cost money (though the weather forecast API does appear to have a relatively generous free tier in terms of requests per month), but one day I'd love to build this in if possible. 


# Acknowledgements
Many thanks to Jogesh K. Muppala whose class, Full-Stack Web Development with React on Coursera, was my introduction and inspiration.

Many thanks also a variety of free tutorials online that helped walk me through the process of adding certain functionality.  I have included references for the components that were heavily influenced by these walkthroughs.  The two most referenced were:

https://www.pluralsight.com/guides/using-d3.js-inside-a-react-app
https://www.codingdeft.com/posts/react-authentication-mern-node-passport-express-mongo/
