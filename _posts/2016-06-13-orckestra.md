---
layout: post
title:  "Learnings from a DevOps Hackfest with Orckestra"
author: "William Buchwalter & Julien Stroheker"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-06-13
categories: DevOps
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt:  This article is aimed a sharing the learnings from the DevOps Hackfest with Orckestra.
---

## Learning from Hackfest with Orckestra ##

Orckestra teamed up with Microsoft for a week during a hackfest. 
During this event we discussed different DevOps practices that could positively impact their software delivery process, among which:
  
* Automated load testing
* Automated functional tests as part of the Continuous Integration
* User telemetry
* Microservices and containerization

Many people from Orckestra were involved during the value stream mapping, but here is the core hack team:

* Nicolas Rose
* Maxime Beaudry
* Stephane Lapointe (MVP)
* Stephane Larocque
* Guillaume Salles
* Simon Michaud
* Guillaume Raymond
* Michael Bouchard
* William Buchwalter 
* Julien Stroheker

 
## Customer Profile ##

Founded in 2006, Orckestra is the leading provider of .NET e-commerce solutions and services.
It is based in Montréal, Canada and has offices in Europe and USA.

During this hackfest we focused on their main product, called "Orckestra Commerce Cloud" (OCC) which is a unified commerce platform enabling retailers to create 
seamless shopping experiences for their customers online, on mobile and in store.

### Architecture Overview

Currently, OCC is a monolitic application that run on multiple virtual machines on Azure. 
Each customer has it's dedicated OCC infrastructure, and the number of VMs can vary based on the size of the customer.

## Problem Statement ##

The first day and a half was about establishing a Value Stream Map of the current delivery process, from conception to production.
This activity generated great discussions among the team and allow everyone to see the big picture and not only their part of the process.

![Value Stream Mapping]()

While we can see that Orckestra already has a lot of DevOps practices in place, the team has larger ambitions.

This map is quite big: There is actually two teams working sequentially to deliver the final product.
The first team is working on the core platform (OCC), features that are common to every customers. 
Once done, another team grab the OCC's package and add features specific to a given customer on top of it.
A package containing both team's work is then delivered in production. 

While necessary today, this approach means there is no easy way for the platform team to ship an update directly in production, even if no new features or breaking changes were made.
Consequently, delivering a new feature in production takes around 28 weeks, which is much longer that Orckestra's goal.

It was decided to work on two different aspects during the hackfest:

* 1 - Improving the lead time of the current process. This a short/medium term objective. While not ideal, the current process cannot be changed in a matter of days, so it needs to be improved.
Many suggestions were made on how to optimize it during the Value Stream Mapping, and we agreed to work on the following points:
	* Load tests: Currently load testing takes around 2 days, is done manually and has a scrap rate of 95%, this is a huge time investment. We worked on automating and simplifying it.
	* Functional tests: While some parts of the front-end already have functional tests, it is not automated. We wanted to change that so that it's part of the continuous integration.
	* User telemetry: This is something Orckestra already envisioned but never implemented. User telemetry allows to understand how a feature is used (or not) by users in production. This is very important, especially when dealing with a long lead time as it allows to prioritize work more efficiently.
* 2- Exploring a new process: Looking ahead, Orckestra's team is aware they will need to change the way they work in a more radical manner. We decided to explore ways for the platform to deliver smaller updates that could be shipped directly into production without needing rework from the team in charge of the customer's specific needs.
	* Micro-services architecture: How could the OCC be split into smaller independant parts?
	* Containers: Among other things, containers would allow easier deployments, and a consistent environment from development to production.

Once the mapping complete, the map was moved in a place where everyone could see and discuss it.

## Solutions, Steps, and Delivery ##

### Functional Testing
**NightWatch.js**

The QA team does a lot of test manually, which of course take some time and is prone to mistakes. We quickly spotted that we could run some existing selenium UI tests automatically during the build process.

These selenium tests are written using NightWatch.js which is an awesome library to do end-to-end testing in node.js.

[Test example here]
[Test output on console here]

** run on selemium vs chrome on custom agent?**

### Load Testing

### User Telemetry

**Redux-appinsights**

When dealing with a big lead time, wastes or mistakes that happens at the beginning of the pipeline are very costly since they potentially impact weeks of work.
We decided to implement some user telemetry to know which features where used and which were not. That way the product management's team will have concrete data to help them make sure the team is working on something that actually delivers value to the end customer.


## Looking Ahead

### Micro Services & Containers
	
 
## Conclusion ##

The Value Stream Mapping was a challenging activity considering the complexity of the process and the number of people it involves, but it really helped the team see the big picture, and understand what concretly happens outside of their own day to day assignations.

A lot of very interesting ideas on how to improve the process were discussed during this hackfest, some more doable than others, but most importantly, the whole team realize the value of continuously improving and are committed and willing to put a lot of effort into this, which promise a bright future for Orckestra! 



## General lessons ##
Bulleted list of insights the Hackfest team came away with

What can be applied or reused in other environments or other customers ?

## Resources ##
Links to additional resource (documentation, blog posts, github repos, ...)
