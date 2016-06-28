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

* Maxime Beaudry - Senior Developer
* Nicolas Rose - Director of Software Engeneering
* Stephane Lapointe - Cloud Solution Architect, and Microsoft Azure Most Valuable Professional
* Stephane Larocque - Senior Developer
* Guillaume Salles - UI Architect
* Simon Michaud - Automation Team Lead
* Guillaume Raymond - Solutions Architect
* Michael Bouchard - Senior Developer
* William Buchwalter ([@wbuchw](http://twitter.com/wbuchw)) - Technical Evangelist at Microsoft
* Julien Stroheker ([@Ju_Stroh](http://twitter.com/ju_stroh)) - Technical Evangelist at Microsoft

 
## Customer Profile ##

Founded in 2006, Orckestra is the leading provider of .NET e-commerce solutions and services.
It is based in Montréal, Canada and has offices in Europe and USA.

During this hackfest we focused on their main product, called "Orckestra Commerce Cloud" (OCC) which is a unified commerce platform enabling retailers to create 
seamless shopping experiences for their customers online, on mobile and in store.

### Architecture Overview

Currently, OCC is a monolithic system that run on multiple virtual machines on Azure (IaaS). 
Each customer has it's dedicated OCC infrastructure, and the number of VMs can vary based on the size of the customer.

## Problem Statement ##

The first day and a half was about establishing a Value Stream Map of the current delivery process, from conception to production.
This activity generated great discussions among the team and allowed everyone to see the big picture and not only their part of the process.

<img src="/images/orckestra2.jpg" alt="Value Stream Mapping" style="width: 90%;"/>

This map is quite imposing, indeed there are actually two teams working sequentially to deliver the final product.  
The first team is working on the core platform (OCC), features that are common to every customers. It's processes are described by the top row in the above picture.   
Once done, another team grab the OCC's package and add features specific to a given customer on top of it before releasing a package containing both team's work to the end customer. This processes are described by the bottom row in the picture.  
This two groups of processes form a single value stream, not two, since no value is delivered until all the above steps are taken one after the other:  

> A value stream is the sequence of activities required to design, produce, and deliver a good or service to a customer. [...]  
> Value Stream Mapping - Karen Martin & Mike Osterling

While necessary today, this approach means there is no easy way for the platform team to ship an update directly in production, even if no new features or breaking changes were made.
Consequently, delivering a new feature in production takes around 28 weeks, which is much longer that Orckestra's goal.

We can see that Orckestra already has a lot of DevOps practices in place, among which:  
  
* **Continuous Integration** : A commit on any branch will trigger a new build on **Visual Studio Team Services** , and run the **unit tests**. 
* **Integration Tests** : Once the CI passes, a new release is triggered. This release will run integration tests on the solution. Since this is a long process (around an hour), multiple commits will be batch together in a single release.
* **Code Reviews** : Features are developed on a separate feature branch. To merge back into the `dev` branch, a **pull request** has to be opened in VSTS and approved by at least one other developer. 
* **Automated Deployments** : Every night (or on demand) **Jenkins** will deploy the integration and QA environment with the latest available version.

### Hackfest's Objectives ###

We agreed on two objectives for the next 4 days:  

* First, improving the lead time of the current process. This a short/medium term objective. While not ideal, the current process cannot be changed in a matter of days, so it needs to be improved.  
Many suggestions were made on how to optimize it during the Value Stream Mapping, and we agreed to work on the following points:  

	* Load tests: Currently load testing takes around 2 days, is done manually and has a scrap rate of 95%, this is a huge time investment. We worked on automating and simplifying it.  
	* Functional tests: While some parts of the front-end already have functional tests, it is not automated. We wanted to change that so that it's part of the continuous integration.  
	* User telemetry: This is something Orckestra already envisioned but never implemented. User telemetry allows to understand how a feature is used (or not) by users in production. This is very important, especially when dealing with a long lead time as it allows to prioritize work more efficiently.  
* Second, exploring a new process: Looking ahead, Orckestra's team is aware they will need to change the way they work in a more radical manner. We decided to explore ways for the platform to deliver smaller updates that could be shipped directly into production without needing rework from the team in charge of the customer's specific needs.  

	* Micro-services architecture: How could the OCC be split into smaller independant parts?  
	* Containers: Among other things, containers would allow easier deployments, and a consistent environment from development to production.  

Once the mapping complete, the map was moved in a place where everyone could see and discuss it.

![Value Stream Mapping](/images/orckestra3.jpg)

## Solutions, Steps, and Delivery ##

### Functional UI Testing

The QA team does a lot of test manually, which of course take some time and is prone to mistakes. 
On one of Orckestra's front end application some functional tests were already in place.
We decided to use the same approach, and to also make those tests part of the continuous integration pipeline, faster feedback is always better.

These tests are written in Node.js and use [Nigthwatch.js](http://nightwatchjs.org/) to interact with the UI (behind the scene, Nightwatch.js uses [Selenium](http://www.seleniumhq.org/)).
Nightwatch is very easy to use, here is what a simple test looks like :

{% highlight javascript %}
describe('Demo test for Mocha', function() {

  describe('with Nightwatch', function() {

    //Removed some code for clarity

    it('uses BDD to run a simple test', function(client) {
      client
        .url('http://google.com')
        .expect.element('body').to.be.present.before(1000);

      client.setValue('input[type=text]', ['nightwatch', client.Keys.ENTER])
        .pause(1000)
        .assert.containsText('#main', 'Night Watch');
    });
  });
});
{% endhighlight %} 

We load a web page (google.com in this case), check that the page displayed correctly (`body` is present), enter a search term, and finally check that the result contains our expected result.
Nightwatch will then output a JUnit test report that can be imported by VSTS.

For now we decided to use a custom build agent with Chrome installed on it. But [PhantomJS](http://phantomjs.org/) or similar libraries could be used instead of a real browser, making these tests runnable on a hosted agent.

### User Telemetry

When dealing with a big lead time, wastes or mistakes that happens at the beginning of the pipeline are very costly since they potentially impact weeks of work.
We decided to implement some user telemetry to know which features where used and which were not. 
That way the product management's team will have concrete data to help them make sure the team is working on something that delivers tangible value to the end customer.

Our goal was to be able to monitor the usage of the different features of one of the front-end application built in JavaScript (Angular.js) as a start.
This application also use [Redux](https://github.com/reactjs/redux), a library that serves as an alternative to the MVC pattern and helps writea applications in a more coherent manner.
In Redux every event (a user clicking a button, a response from the server, etc.) is known as an [action](http://redux.js.org/docs/basics/Actions.html) and is described via a plain javascript object.
Each action as a `type`, and may have additional properties describing the event. For example, an action describing a user adding a comment might look like that:

{% highlight text %}
{
  type: 'ADD_COMMENT',
  text: 'This is a comment'
}
{% endhighlight %} 

This action is then dispatched to allow the system to react accordingly (for example, updating a counter of the number of comments).
One interesting property of Redux, is that every action will always go through a component known as the `dispatcher` first. 
This means that we can add a custom hook to the `dispatcher` to monitor all the `actions` going through the system. This kind of hooks are known as a [middleware](http://redux.js.org/docs/advanced/Middleware.html).

We decided to build a custom `middleware` that will send the `actions` to Application Insights on Azure. This would allow for precise usage monitoring of the features.
You can find the finished and reusable middleware [on GitHub](https://github.com/wbuchwalter/redux-appinsights).

First we need to create an Application Insights instance on Azure, grab the JavaScript snippet from the portal and add it to our application.  
Then we plug our custom `middleware` into the application, the only thing left to do is define which `actions` we want to track. 
We could log every action that occurs, but too much logging is like no logging at all because it becomes harder to find meaningful informations (See [Jeff Atwood's post on the subject](https://blog.codinghorror.com/the-problem-with-logging/)).

To mark an `action` as of interest we simply have to append the object:

{% highlight text %}
{
  type: 'ADD_COMMENT',
  text: 'This is a comment',
  meta: {
    appInsights: { trackPayload: true}
  }
}
{% endhighlight %} 

We can see that our `actions` are correctly received by Application Insights.

![Application Insight Image](/images/orckestra1.png)
 
A good practice could be to define our expectation before rolling out a new feature, for example : "We expect 10% of our user to post a comment (our new feature) once a day".
With Application Insights Analytics we can then create custom queries such as the percentage of sessions where the event `'ADD_COMMENT'` occured.
Comparing our expectations with the reality, we could then decide which direction to take next.

## Looking Ahead

Part of the hacking team spent some time looking at how to improve the value stream more dramatically by rethinking the whole release process.
As this will be a long lasting project, we only touched the surface during this Hackfest.

### Micro Services & Containers

As we saw during the Value Stream Mapping, the monolithic nature of the platform prevents from releasing very often. Since there is no isolation between components, the QA team has to test every component for each release, since even a small change could have an impact anywhere.
Consequently, a first step might to extract one component after the other from the monolith. 
This is easier said than done, but the whole team was convinced the long term return on investment outweights the upfront refactoring cost.

We also took some time investigating containerization of those independents components.
Indeed, this would further reduce the lead time by adressing several pain points:  

* The solution currently takes quite some time to install
* Scaling 
* Provsioning / Deprovisioning of integration environments when needed
* Integration test scrap rate because of different environments: container would ensure same image as in prod
* Easier deployment: rollback are really easy -> less risk deploying

Of course, there is no free lunch: ....

The platform is currently running on .NET `4.5.3` so containers will need to use Windows Server Core as base image since Nano only support .NET Core.
The size of the images (around 9GB for a Server Core image) should not be too problematic thanks to Docker's cache.

Docker Swarm could then be used to orchestrate the different containers. DC/OS should also support windows containers in the future.
But this is a discussion for another time!
 
## Conclusion ##

The Value Stream Mapping was a challenging activity considering the complexity of the process and the number of people it involves, but it really helped the team see the big picture, and understand what concretly happens outside of their own day to day assignations.

A lot of very interesting ideas on how to improve the process were discussed during this hackfest, some more doable than others, but most importantly, the whole team realize the value of continuously improving and are committed and willing to put a lot of effort into this, which promise a bright future for Orckestra! 

## Resources ##
* [Orchestrating containers with service fabric](https://blogs.msdn.microsoft.com/azureservicefabric/2016/04/25/orchestrating-containers-with-service-fabric/)
* [Azure container Services](https://azure.microsoft.com/en-us/services/container-service/)
* [Running Docker Swarm on Microsoft Azure (channel 9)](https://channel9.msdn.com/Blogs/containers/Docker-Swarm-Part-1)
* [Mesosphere on Azure](https://mesosphere.com/azure/)
* [.NET Core 1.0](https://www.microsoft.com/net/core)

