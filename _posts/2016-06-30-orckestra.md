---
layout: post
redirect_to: "https://microsoft.github.io/techcasestudies/devops/2016/06/30/orckestra.html"
title:  "Learnings from a DevOps Hackfest with Orckestra"
author: "William Buchwalter & Julien Stroheker"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2016-06-30
categories: DevOps
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt:  This article is aimed at sharing the learnings from the DevOps Hackfest with Orckestra.
---

# Learnings from a DevOps Hackfest with Orckestra #

Orckestra teamed up with Microsoft for a week-long Hackfest. 
During this event we discussed different DevOps practices that could improve their software delivery processes, such as:
  
* Automated load tests
* Automated functional tests as part of Continuous Integration
* User telemetry
* Microservices and containerization

The core hack team from Orckestra included the following:

* 8 Developers
* Director of Software Engineering
* Cloud Solution Architect and Microsoft Azure Most Valuable Professional
* Automation Team Lead
* Platform Architect
* Infrastructure Architect
* Product Owner

They were joined by these technical evangelists from Microsoft:

* William Buchwalter ([@wbuchw](http://twitter.com/wbuchw)) 
* Julien Stroheker ([@Ju_Stroh](http://twitter.com/ju_stroh)) 

 
## Customer profile ##

Founded in 2006, [Orckestra](http://www.orckestra.com/) is a leading provider of .NET e-commerce solutions and services.
It is based in Montréal, Canada, and has offices in Europe and the United States.

During this Hackfest, we focused on their main product, Orckestra Commerce Cloud (OCC), a unified commerce platform enabling retailers to create 
seamless shopping experiences for their customers online, on mobile, and in-store.

### Architecture overview ###

Currently, OCC is a single system that runs on multiple virtual machines on Azure (Infrastructure as a Service). 
Each customer has its dedicated OCC infrastructure, and the number of virtual machines can vary based on the size of the customer.

## Problem statement ##

We spent the first day and a half establishing a Value Stream Map (VSM) of the current delivery process, from conception to production.
This activity generated great discussions among the team and allowed everyone to see the big picture—not just their part of the process.

<img src="/images/orckestra2.jpg" alt="Value Stream Mapping" style="width: 90%;"/>

As the Value Stream Map shows, there are actually two teams working sequentially to deliver the final product.  
The first team (Product Core Team) is working on the core platform (OCC), features that are common to every customer. Its processes are described by the top row in the image above. 

Once done, another team (Product Implementation Team) takes the OCC package and adds features specific to a given customer. A package containing both teams' work is then released to the end customer. These processes are described in the bottom row of the VSM image.  

These two groups of processes form a single value stream, not two, since the value is delivered only when the platform is actually rolled out to a customer.

> A value stream is the sequence of activities required to design, produce, and deliver a good or service to a customer. [...]  
> Value Stream Mapping - Karen Martin & Mike Osterling

To support a faster delivery of value, Orckestra has already implemented a lot of DevOps practices; among them:  
  
* **Continuous Integration (CI)**: A commit on any branch will trigger a new build on **Visual Studio Team Services (VSTS)**, and run the **unit tests**. 
* **Integration Tests**: Once the CI passes, a new release is triggered. This release will run integration tests on the solution. Since this is a long process (about one hour), multiple commits are grouped together in a single release.
* **Code Reviews**: Features are developed on a separate feature branch. To merge back into the `dev` branch, a **pull request** has to be opened in VSTS and approved by at least two other people (technical and business). 
* **Automated Deployments**: Every night (or on demand), [**Jenkins**](http://www.jenkins.io) will deploy the integration and QA environment with the latest available version.

The purpose of the hackfest was to explore new opportunities for improvement and put an execution plan in place to implement those improvements over the next few months.

### Hackfest objectives ###

We agreed on two objectives for the four days of the Hackfest:  

**Improving the lead time of the current process as a short- to medium-term objective**  
The current process cannot be changed in a matter of days, so improvements needed to be found. 
Many suggestions were made on how to optimize it during the Value Stream Mapping, and we agreed to work on the following topics:  

  * Load tests: Currently load testing has too many manual steps, we worked on automating and simplifying it.  
  * Functional tests: While some parts of the front-end already have functional tests, automation was missing. We wanted to change that so it becomes part of the continuous integration.  
  * User telemetry: This is something Orckestra had already envisioned but had not implemented yet. User telemetry allows a team to understand how a feature is used (or not) by users in production. This is very important, especially when dealing with a long lead time as it helps to prioritize work more efficiently.  

**Exploring a new process**  
We also decided to explore ways for the platform to deliver smaller updates that could be shipped directly into production across all customer environments without any manual intervention per environment. The selection options, that Orckestra is now implementing, included: 

  * Microservices architecture: How could the OCC be split into smaller, independent parts?  
  * Containers: Among other things, containers would allow easier deployments and a consistent environment from development to production.  

Once the mapping was complete, we moved it to a place where everyone could see and discuss it.

![Value Stream Mapping](/images/orckestra3.jpg)

*Check the resources section if you want to see the VSM in HD.*

## Solutions, steps, and delivery ##

### Load tests

Orckestra has implemented some load tests in the past, using the Test Controllers and Test Agents from Visual Studio running on multiple virtual machines deployed on Azure.

While these load tests are able to serve their purpose, more effective automated load testing was needed.

Aware of this, the QA team started to rethink this step a few weeks before the Hackfest. They decided to look at the cloud-based solution from [LoadImpact.com](http://www.loadimpact.com) to generate their web tests on the front-end part and on the API part of the application first.

During our Hackfest, the QA team took the time to set up some scenarios in their LoadImpact.com subscription, and in the meantime we offered to develop a VSTS extension to automatically start some test scenarios from their VSTS tenant whenever they want in their Build or Release pipeline. With this approach, we proved at Orckestra that everything can be automated in their stream thanks to some "hack"; for example, an extension in this case.

So we started [this project on GitHub called loadimpact-vsts-extension](https://github.com/julienstroheker/loadimpact-vsts-extension).

The idea is simple: Reach the [LoadImpact.com API](http://developers.loadimpact.com/api/index.html) and start some scenarios already set up whenever they want thanks to a Build or Release step :

![Load Impact VSTS Extension](/images/OrckestraLoadImpactExt.png)

For now, this extension is really straightforward but it helps Orckestra to launch some recursive tests such as:
* Basic API Calls to check if the important parts of the application are responding with the correct SLA defined.
* Basic Web Calls to check if all the components of the application are responding.

Behind the scenes, we used (TypeScript, Gulp, NPM...).

The fact that the load tests are now being directly integrated in their pipeline helps Orckestra have more efficient testing, and makes sure the tests are run every time and not manually triggered.

![Load Impact VSTS Extension](/images/OrckestraRelease.png)

Here is an example of the test "GetGuestCart" launched from VSTS:

![Load Impact VSTS Extension](/images/OrckestraLoadImpact.png)

When the test is done on Load Impact, Orckestra receives a slack notification:

![Load Impact VSTS Extension](/images/OrckestraSlack.png)

We also started to implement the Application Insights feature inside OCC to track user interactions (see the next sections). In the future, Orckestra will correlate the load test data with the user telemetry one to obtain deeper results and adapt their load scenarios to anticipate the scale.

### Functional UI testing

We then  took some functional tests that were already in place on one of Orckestra’s front-end applications, and we  used the same approach to make those tests part of the Continuous Integration pipeline. Faster feedback is always better.

These tests are written in Node.js and use [Nightwatch.js](http://nightwatchjs.org/) to interact with the UI. Behind the scenes, Nightwatch.js uses [Selenium](http://www.seleniumhq.org/)). Here is what a simple test with Nightwatch looks like:

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

We load a web page (google.com in this case), check that the page is displayed correctly (`body` is present), enter a search term, and finally check that the result contains our expected result.
Nightwatch will then output a JUnit test report that can be imported by VSTS.

For now, we decided to use a custom build agent with Chrome installed on it. But [PhantomJS](http://phantomjs.org/) or similar libraries could be used instead of a real browser, making these tests runnable on a hosted agent.

### User telemetry

To better undersrtand and compare the value of different features, we decided to implement some user telemetry to determine which features were used and which were not. The product management team will then have concrete data to help them validate the priority of different features by understanding how they’re used..

Our goal was to be able to monitor the use of the different features of one front-end application built in JavaScript (Angular.js) as a start.
This application also used [Redux](https://github.com/reactjs/redux), a library that serves as an alternative to the MVC pattern and helps write applications with a consistent behavior.
In Redux every event (a user clicking a button, a response from the server, for example) is known as an [action](http://redux.js.org/docs/basics/Actions.html) and is described via a plain JavaScript object.
Each action has a `type`, and may have additional properties describing the event. For example, an action describing a user adding a comment might look like this:

{% highlight text %}
{
  type: 'ADD_COMMENT',
  text: 'This is a comment'
}
{% endhighlight %} 

This action is then dispatched to allow the system to react accordingly (for example, updating a counter of the number of comments).
One interesting property of Redux is that every action will always go through a component known as the `dispatcher` first. 
This means we can add a custom hook to the `dispatcher` to monitor all the `actions` going through the system. These kind of hooks are known as [middleware](http://redux.js.org/docs/advanced/Middleware.html).

We decided to build a custom `middleware` that will send the `actions` to Application Insights on Azure. This would allow for precise usage monitoring of the features.
You can find the finished and reusable middleware [on GitHub](https://github.com/wbuchwalter/redux-appinsights).

First we need to create an Application Insights instance on Azure, grab the JavaScript snippet from the portal, and add it to our application.  Then we plug our custom `middleware` into the application. After that, the only thing left to do is define which `actions` we want to track. 

We could log every action that occurs, but too much logging is like no logging at all because it becomes harder to find meaningful information (See [Jeff Atwood's post on the subject](https://blog.codinghorror.com/the-problem-with-logging/)).

To mark an `action` as of interest, we simply have to append the object:

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
 
A good practice could be to define our expectation before rolling out a new feature. For example: "We expect 10% of our users to post a comment (our new feature) once a day."
With Application Insights Analytics, we can then create custom queries such as the percentage of sessions where the event `'ADD_COMMENT'` occurred.
Comparing our expectations with the reality, we could then decide which direction to take next.

## Looking ahead: microservices and containers

Part of the hacking team spent some time looking at how to improve the value stream more dramatically by rethinking the whole release process.
This project will run for an extended period of time and we only touched the surface during this Hackfest.

As of today, the application is built following a singlevalue stream. In the future, this stream will be split into  two smaller ones:

* A value stream for the platform (OCC): Any non-breaking update to the core system should be releasable very easily and on its own.
* Another one for delivering the custom features of each client.

As the current OCC platform has grown to support many use cases over time, Microservices are the right next step to break out the complexity into a set of smaller deployable pieces.  Orckestra is now delivering new services as Microservices and over time will convert some of their existing services to microservices that they can ship separately as well.  We also spent some time investigating containerization of those independent components. Indeed, this would further reduce the lead time by addressing several pain points:

* Ensuring integration tests are running in a production-like environment. Also, a significant cause of scrap rate for integration tests is due to heterogeneous environments.
* Faster deployments. Only the image of the component that was updated needs to be redeployed.
* Easier scaling in production. With tools such as Docker Swarm, scaling becomes almost painless (for stateless components). 
* Greater flexibility of integration and QA environments deployment. Provisioning and de-provisioning of environments become an extremely fast process.

Of course, there are tradeoffs. While providing many advantages, microservices are complex. Dependencies are harder to manage correctly, breaking changes become difficult to handle. Generally speaking, microservices demand a lot more discipline with regard to tests, deployments, and API design.

The platform is currently running on .NET `4.5.3`, so containers will need to use Windows Server Core as a base image since Nano supports only .NET Core. The size of the images (around 9 GB for a Server Core image) should not be too problematic thanks to Docker's cache.

Docker Swarm could then be used to orchestrate the different containers. DC/OS should also support Windows containers in a not too distant future. But this is a discussion for another time.
 
## Conclusion ##

The Value Stream Mapping was a challenging activity considering the complexity of the process and the number of people it involved, but it helped the team see the big picture and understand what really happens outside of their own day-to-day roles.

A lot of very interesting ideas on how to improve the process were discussed during this Hackfest, some more doable than others. Most importantly, though, the whole team realizes the value of continuous improvement and they are committed and willing to put a lot of effort into this.  Already since the hackfest, the team has made significant load testing automation improvements, and are near completion of their first Microservices-based service, with more to come.

## General lessons ##
Some key points to consider:  

* Automated testing needs to always be a top priority, from unit tests to integration and load tests. Being confident in the quality of the code is a prerequisite in order to release it.
* Monolithic applications work, and can be optimized to a certain extent, but continuous delivery and small batch size can be obtained only by having smaller components with well-defined boundaries.

While we discussed a specific implementation of microservices (containers), there is no simple solution, and many other solutions such as [Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/) exist to achieve a comparable result.


## Resources ##
* [The Value Stream Mapping in HD](/images/orckestra_VSM_HD.jpg)
* [Orchestrating containers with Service Fabric](https://blogs.msdn.microsoft.com/azureservicefabric/2016/04/25/orchestrating-containers-with-service-fabric/)
* [Azure Container Service](https://azure.microsoft.com/en-us/services/container-service/)
* [Running Docker Swarm on Microsoft Azure (Channel 9)](https://channel9.msdn.com/Blogs/containers/Docker-Swarm-Part-1)
* [Mesosphere on Azure](https://mesosphere.com/azure/)
* [.NET Core 1.0](https://www.microsoft.com/net/core)
* [Load Impact](https://loadimpact.com/)

