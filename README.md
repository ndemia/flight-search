# Flight search (Interview test, volume 1)
![picture](https://github.com/ndemia/demia.me/blob/main/assets/images/flight_x2.png)

## Context
As part of the process for a role at a digital marketing agency, I was given the website of an airline to work on. The task was to create a program that would check the flights that the user had previously searched for, and display the last 3 the next time it loaded. The main condition was that the code had to work from the console, like it was injected. This assignment relied on another website, so I decided to replicate it as a way to practice and improve my initial solution.

## Tech stack
HTML, CSS (SASS), TypeScript.

## Requirements
- To be completed with vanilla JavaScript.
- It had to work from the browser's console.
- The results' design should fit in with the rest of the website.

## Problems
In the beginning, I wasn't quite sure how I could make it work through the console considering the fact that when the browser reloads, everything was lost. I also had to add the functionality to the form so that the results would be saved. Also, due to my lack of knowledge at that particular time, I had to hard-code some values, and overall my code was not scalable. It still worked though! hehe.

## Process 
First, I had to dig around the website's code to understand its structure. I found out that the website had two forms, one for desktop and another for mobile, and only the mobile form was the one that actually processed the data. I also discovered that it used localStorage to save information. Being a detective can be fun. So from there it was a matter of adding the functionality to the form to get the data and save it using localStorage. Then I would run another function from the console that would check for saved flights, and show them if there were any. Design-wise, I made the results blend with the rest of the website, which looked nice and was appreciated. The CSS was all added through JavaScript.

## Learnings
I have to say that injecting the code from the console was pretty cool (hacker vibes). This was the first time I learned about localStorage as an alternative to cookies too. More importantly, I'd say I'm much more conscious about making my code scalable by learning and trying to apply best practices. I also don't hard-code values anymore... as far as I know. I didn't get the job, but I was still proud of what I had achieved. Now that my skills have improved, I look at this assignment fondly.

https://ndemia.github.io/flight-search/
