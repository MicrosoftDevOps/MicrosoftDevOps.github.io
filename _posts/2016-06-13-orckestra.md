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

Intro statement with bulleted lists of:

- DevOps practices implemented 
- Core Hack Team: Names, roles and Twitter handles

* Running selenium tests with Nightwatch.js automatically in a build
* Load Tests
* Deploy cloud environment
* container?

 
## Customer Profile ##
Company name, description

	Installations

	Participants

	Countries

	Product/service offerings

Focus of the Hackfest

 
## Problem Statement ##


Define what is the problem(s)/challenges that the customer wants to address with the Hackfest

Describe how the problems have been identified and what is the current situation (including metrics like the lead time) 
 
## Solutions, Steps, and Delivery ##

Value Stream Mapping description and how it helped in the exercise

DevOps practice area improved (source code snippets, pictures, drawings)

	Define what was worked on and what problem it helped solve

	Technical details of how this was implemented
	
	Pointers to references or documentation 
	
	Learnings from the Microsoft team and the customer team
	

# NightWatch.js

The QA team does a lot of test manually, which of course take some time and is prone to mistakes. We quickly spotted that we could run some existing selenium UI tests automatically during the build process.

These selenium tests are written using NightWatch.js which is an awesome library to do end-to-end testing in node.js.

[Test example here]
[Test output on console here]

** run on selemium vs chrome on custom agent?**

# Redux-appinsights

When dealing with a big lead time, wastes or mistakes that happens at the beginning of the pipeline are very costly since they potentially impact weeks of work.
We decided to implement some user telemetry to know which features where used and which were not. That way the product management's team will have concrete data to help them make sure the team is working on something that actually delivers value to the end customer.

 
## Conclusion ##

The Value Stream Mapping was a challenging activity considering the complexity of the process and the number of people it involves, but it really helped the team see the big picture, and understand what concretly happens outside of their own day to day assignations.

A lot of very interesting ideas on how to improve the process were discussed during this hackfest, some more doable than others, but most importantly, the whole team realize the value of continuously improving and are committed and willing to put a lot of effort into this, which promise a bright future for Orckestra! 



## General lessons ##
Bulleted list of insights the Hackfest team came away with

What can be applied or reused in other environments or other customers ?

## Resources ##
Links to additional resource (documentation, blog posts, github repos, ...)
