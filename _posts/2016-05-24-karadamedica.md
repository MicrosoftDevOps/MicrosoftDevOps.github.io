---
layout: post
title:  "Learnings from a DevOps Hackfest with Karadamedica"
author: "Tsuyoshi Ushio"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-05-24
categories: DevOps
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: Microsoft teamed up with Karadamedica to hack integrated Microsoft DevOps technologies on Azure.
---

## Learnings from a DevOps Hackfest with Karadamedica ##

Microsoft teamed up with Karadamedica to hack integrated Microsoft DevOps technologies on Azure. The DevOps practices that were implemented during this process were:

- Infrastructure as Code (IaC)
- Continuous Integration / Continuous Deployment
- Release Management
- Automated Testing
- Software Kanban
- Load Testing

## Customer Profile ##

[Karadamedica](http://www.karadamedica.co.jp/) runs a health care Q&A website in Japan. Customers ask questions and receive answers from doctors, pharmacists, and nurses. The service helps people manage their health and understand their symptoms.

Like many Japanese organizations, Karadamedica has a command-control culture. Management uses a top-down approach to determine the value of the service. Employees often are not proactively involved in developing the service; rather, they wait for decisions by their managers.

The Karadamedica team wanted to move to a Hypotheses-Driven Development approach. They also wanted to shorten the Build-Measure-Learn cycle and learn from the user and production environment. And, they wanted to move forward from their current architecture of Cloud Services on Azure. 

As part of the DevOps journey, they wanted to remove unnecessary practices and implement more automation. Microsoft and Karadamedica discussed these issues and how to begin the DevOps journey together with this Hackfest.


![](/images/karadamedica1.jpg)
*Figure 1: Karadamedica Hackathon members*

The full-time Hackfest team included:

- Hideyuki Nozawa, manager  
- Takahiro Hirata, developer  
- Yasuichi Shoji, IT Pro  
- Akiko Tokaichi, product owner  
- Yukina Matsumoto, business owner

The part-time team included:

- Hiroomi Hayashi, CEO 
- Ryu Wada, business owner  
- Kumi Yamamori, product owner  
- Yukina Matsumoto, product owner  
- Kumiko Shigemori, User Centered Design (UCD) 
- Aki Honda, UCD

Support members included:

- Tsuyoshi Ushio(@sandayuu), Microsoft Senior Technical Evangelist (DevOps)  
- Daisuke Kozuka, Microsoft Technical Evangelist – IT Pro (Azure, VSTS, Power BI) 
- Junichi Anno(@junichia), Microsoft Principal Technical Evangelist – IT Pro (AD, PowerShell)  
- Naoki (NEO) Sato(@satonaoki), Microsoft Senior Technical Evangelist – IT Pro (Azure)  
- Masaki Takeda, Microsoft Tech Solutions Professional (VSTS)


## Problem Statement ##
Karadamedica was wrestling with issues such as:
 
- Problems with communication between the development team and the business owners. 
- Many required approvals and a lot of manual processes. 
- Use of an older Azure architecture like Cloud Services with worker roles for Batch application. 
- Sharing an Ops role with parent company projects. 
- A heavy workload.
- Use of only automated unit testing.

Some of their DevOps goals were:

- Install automated acceptance testing and load testing. 
- Move from Cloud Services to WebApps.
- Accelerate adoption of Lean Startup / UX methods like Lean Canvas, Persona, and Customer Journey Map to increase their customer base.

They already had adopted Agile development, which was a good start. However, they were just following the Agile practices without really understanding the mindset, resulting in a lot of wasteful processes. They wanted to better understand the mindset and reduce the waste.

Their current lead time was one deployment per 13 days. 

## Current Architecture ##

The architecture at the time of the Hackfest was as follows:

- .Net C# with Azure (Cloud Services Web Role, Worker Role)
- Kanban / Bug Tracking: Trello, Redmine
- CI: Jenkins
- Source Control: GitLab
- Automated Testing: Unit Testing
- Load Testing: JMeter
- Static Analysis: SonarQube

With regard to the architecture, the biggest problem was the manual deployment process. One of our goals was to automate this process using Release Management. They started using Visual Studio Team Services for this purpose.

## Solution, Steps, and Delivery ##
Before beginning the Hackfest, we conducted a Value Stream Mapping exercise to help everyone visualize the current processes and find areas in need of improvement. Participants in this exercise included Dev, Ops, Product Owner, Business Owner, UX/Design, and CEO. Having the CEO participate and take part in the decision-making was especially helpful because it was necessary to have his approval.

 ![](/images/karadamedica2.jpg)
*Figure 2: Value Stream Mapping*

We discussed solutions to the issues—in particular, the release process, which had a lot of unnecessary steps. Our goal was to reduce the time of one deployment to one day.

Then the Hackfest got under way. It was performed over two periods several months apart to accommodate scheduling.
 
### Part 1 of the DevOps Hackfest ###

On day 1, we chose several pain points, prioritized them, and came up with solutions together. We wrote stories to visualize and share on Visual Studio Team Services (VSTS).

![](/images/karadamedica3.png)
*Figure 3: Software Kanban on Visual Studio Team Services* 

We had only three days for this part of the hack, and we spent the first day discussing and setting up Azure and VSTS.

On the second day, we gave a DevOps presentation to Dev/Ops/Biz and managers. It was important to involve the managers to get approval to change the development process.
 
Then we chose our tasks and began the hacking. Because it was a large team, we could hack concurrently.

Hideyuki hacked the Automated Acceptance Testing tools ([SpecFlow](http://www.specflow.org/) and [Selenium](http://www.seleniumhq.org/)). We could write acceptance testing in Japanese, which meant the Product Owner could do that. Yasuichi hacked Azure Resource Manager for IaC. Daisuke hacked the new Batch architecture using Service Bus.
 
The team enjoyed the challenge of hacking and was able to do a lot of it on their own. But there was a cultural reluctance to ask questions and seek assistance, which we began to notice as the day went on. As a result, we didn’t make as much progress as expected. We learned from this and addressed it the next day by narrowing our focus.

![](/images/karadamedica4.jpg)
*Figure 4: Build demo*

On day 3, we focused on only a few tasks that would generate the best outcome and that the Microsoft team was most needed for: Release Management, Infrastructure as Code, and Visualize the Business Value. Because we had three technical evangelists, we did pair programming with Karadamedica developers and IT Pros.

We successfully implemented Release Management using VSTS, Infrastructure as Code using Azure Resource Manager, and Visualize the Business Value using Power BI. The CEO especially was pleased because Power BI can easily capture current status and they can learn from the production environment and analyze it quickly.

![](/images/karadamedica5.jpg)
*Figure 5: Power BI demo*


![](/images/karadamedica6.jpg)
*Figure 6: Automated Load Testing* 

Tsuyoshi, who is an Agile coach, discussed with the Product Owner and UCD ways to eliminate wastefulness in the idealization process and how to make user stories with UCD.

We successfully completed the tasks for the first part of the Hackfest, making it possible for Karadamedica to implement several DevOps practices, change some processes and remove some unneeded practices. The result would reduce the lead time to nine days—a four-day reduction! 

### Part 2 of the DevOps Hackfest ###
The second part of the Hackfest took place over three days a few months later. When we returned, we found that they’d had no time to implement the learning from the earlier session to the production environment. They had been extremely busy during this time.
  
We had learned from the first session to focus on only a few tasks. For the second session, we chose the following:
 
- Implement new learning in the production environment
- Migration from Cloud Services to WebApps

We had set up the Azure subscription and VSTS settings last time, so this time we were able to start hacking immediately. First, however, we promoted the idea of an international DevOps mindset. Japanese culture is often resistant to change and adoption of more efficient processes. As a member of an international team at Microsoft, Tsuyoshi had learned new ways of thinking about work processes. He wanted the Hackfest team to be open to these ideas. Among them:

- Be “lazy.” This means maximize outcome while doing less by focusing on a few, important tasks.
- Ask for help. It increases productivity.
- Remove “should.” Think about which tasks might not be necessary and remove them.

We also shared with them a trade-off slider, an Agile development technique that helps a team prioritize and make decisions. For their development process, we determined the order of priorities to be:
 
1.	Speed
2.	Scope
3.	Quality
4.	Cost

The Karadamedica team wanted to deliver a lot of features quickly so they could benefit sooner from the feedback. They understood that the push to deliver might compromise quality. But the CEO approved and said more resources could be available if needed to make it happen.
 
We imported the source code from production into Visual Studio Team Services and started to create a build definition for Cloud Services. It was easy to implement—we just generated a template for Cloud Services and it worked well. Also, we could deploy it using Release Management. We finished this easily.

Then we moved on to WebApps. They were using Cloud Services for web and batch execution. How should we move from Cloud Services to WebApps? We discussed both web and batch architecture and then began hacking.

![](/images/karadamedica7.jpg)
*Figure 7: Hacking*

Using VSTS, we successfully created a build definition for WebApps. However, our current application was for Cloud Services. When we tried to deploy it to WebApps, we encountered an error: "Conflict: Website with given name xxx-webapps already exists." It was unusual, but it was a known bug. (See Azure Deployment to Web App - Conflict: Website with given name <web app name> already exists.) We set the Remove Visual Studio version to 2013 and switched Remote debugging off and on. Then we were able to deploy apps on WebApps.

![](/images/karadamedica8.jpg)
*Figure 8: Application settings for the "already exists" problem*

We faced one more obstacle. After deploying the application, we got another error: "Server Error in '/' Application." Upgrading Azure SDK from version 2.6 to 2.8 resolved this.

At the same time, Akiko, the product owner, hacked Software Kanban of VSTS. Masaki helped and arranged the Kanban. Also, she learned how to use the feedback client and exploratory testing tool.

![](/images/karadamedica9.png)
*Figure 9: Exploratory testing*

On the final day, we discussed the handoff process between UCD and Dev, in which UCD created a detailed requirements document and then handed it off to Dev. However, if Dev noticed a problem related to implementation, it went back to UCD, taking more time. They resolved to improve this by revising the process. UCD would write the overview sketch and then Dev would come up with a plan for implementing it.
 
Also, UCD and Dev had difficulty coming up with user stories. The process had a high failure rate. We discussed this and came up with an action plan that established who is in charge, when the due date is, and how to carry out the plan.

![](/images/karadamedica10.jpg)
*Figure 10: Finishing the Hackfest*

## Conclusion ##
One month after the Hackfest, we returned to measure the outcome of our collaboration. By then, the lead time was down to 3 days and soon to be 2—a big reduction from the original 13 days!
 
We learned that with collaboration among Dev, Ops, Product Owner, Business Owner, UCD, and the CEO, we could successfully change the process and culture of development at Karadamedica.

We’ve seen improvements from applying Value Stream Mapping analysis and using it to change the processes and rules. Outsourcing of release no longer is needed, which is a tremendous value to the business. And since release is fully automated and stable, they can avoid human error. The transition from Cloud Services to WebApps generates both less work and greater achievement.
 
Hiroomi Hayashi, the CEO of Karadamedica, said he was impressed with the reduction in lead time and the changes in processes and rules. He said Karadamedica used to have a cultural pattern of following instruction. Now, he said, the teams feel freer to think for themselves and come up with their own solutions.  
