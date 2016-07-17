---
layout: post
title: "Learning from a DevOps Hackfest with a Leading Professoinal Services Provider"
author: "Rasmus Hald"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2016-07-01
categories: DevOps
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: In this DevOps Hackfest, Microsoft teamed up with a leading provider of professional services to improve their development processes with a focus on automated testing and release management. We describe the process and the result in this article.
---

## Learnings from a DevOps Hackfest with a Leading Professional Services Provider ##
When a leading multinational professional services provider was looking for ways to improve their development processes, they met with Microsoft to discuss how DevOps could help. Together, they staged a DevOps Hackfest to implement DevOps practices, with a focus on automated testing and release management. 
This article describes the results and how a “DevOps Duo” is now the new normal for this professional services provider (PSP). The DevOps Duo concept brings together two engineers—one each from the development and the deployment teams—who are jointly responsible for the lifecycle of a given application.

## Customer profile ##

This customer is a leading provider of professional services to clients in multiple industries worldwide.
Their IT department manages a large codebase and many applications, both big and small. A large part of this codebase was written prior to current practices and by people who may no longer be with the company. This is known as “legacy code” because it is not up to the standards of current development practices.
We (Microsoft) met with this PSP to discuss how DevOps can help them accelerate their development of software and push more ideas through to users. At the time, they had already started to change how they work and were implementing some good DevOps practices.
Based on these talks, we decided to team up with them to hack these challenges. The joint hack team spent three days in April 2016 working on solutions.
The joint team consisted of five contributors from the PSP along with the following technical evangelists from Microsoft:  
  
- Aleksandar Djordjevic  
- Anton Boyko  
- Clemens Schotte  
- Rasmus Hald  


## Problem statement ##

We quickly concluded that we needed to conduct a Value Stream Mapping exercise to help the PSP identify where time was wasted in the development process. [Value Stream Mapping](https://en.wikipedia.org/wiki/Value_stream_mapping) is a 4- to 6-hour workshop that maps out how the teams involved in application development and delivery work, starting from the conception of an idea for a feature to getting it into production and use.

The following diagram shows the outcome of the Value Stream Mapping exercise at this PSP; the red notes are the identified areas of improvement. From this exercise we learned that this organization had challenges with testing and the release process.

![](/images/LeadingPSP_1.png)

Testing had several challenges:  

- It was a manual task.  
- It had ownership changes.  
- It was sometimes skipped altogether.   
- It had no common practices or requirements in place for implementing automated testing while writing code.   

Because of this, the PSP spent a lot of time on extensive manual testing to ensure the quality of an application prior to deployment to production.

With release management, the PSP deployed every application to six different staging environments:  
    
- Developers’ own PCs    
- Shared development environment  
- Iteration environment  
- Testing environment  
- Staging environment  
- Production environment
  
Although all of these environments were automatically deployed through a comprehensive scripting system, all deployments were executed manually with no central way of knowing what changes were deployed to which environment.

## Solutions, steps, and delivery ##
The team split into two tracks, with one focusing on automated testing and the other on release management.

### Automated testing ###
Automated testing was a central improvement point discovered during the Value Stream Mapping exercise. The team outlined the basics of automated software and agreed on a strategy for implementing automated testing as part of software delivery.

Testing strategy:
   
- All testing must be executed automatically.  
- Writing unit tests must be easy.   
- Development engineers will write tests as part of feature development.  
- Task estimation and planning will include test writing.  
- Tests must be integrated and passed before a release is ready.  
- Every development task must include test writing.  

As a result, development sprints might deliver fewer features, but the quality will be higher. It will mean less time fixing bugs in the long run.
 
Types of tests:  
  

- **Unit test.** A method of testing the function in the source code.  
- **Integration test.** Similar to a unit test, but a test of the integration between different modules in the source code.  
- **UI test.** A process for testing an application’s graphical user interface.  

The hack team focused on automated unit testing and integrating that to the existing code base. This process takes time in order to access existing code and understand its functions. Only then can the test writing begin.
 
Below is a simple example of a unit test written in Microsoft Visual Studio (real code removed to protect IP).



    using System;
    using Microsoft.VisualStudio.TestTools.UnitTesting;
    
    namespace UnitTestProject1
    {
    [TestClass]
    public class UnitTest1
    {
    [TestMethod]
    public void OrderingItems_NegativeNumbers()
    {
    Assert.AreEqual(1, 1);
    }
    
    [TestMethod]
    public void TestMethod1()
    {
    Assert.AreEqual(1, 1);
    }

Here is a sample of a real test execution at a developer workstation:
![](/images/LeadingPSP_2.png)

Tests were then submitted to the codebase as part of the source code and sent to a central repository. For the Hackfest, the team used Visual Studio Team Services (VSTS) to run the tests as part of the build process. In a DevOps world, this is called *Continuous Integration*.

#### Just-in-time Continuous Integration in the cloud ####

When it comes to more frequent deliveries, having automated testing in place is key. In today’s world, great tools exist to support the different types of testing, and teams build systems to run those tests to ensure the quality of the code they are delivering.

But building and maintaining infrastructure for application testing is an expensive and cumbersome task. Making a realistic test requires building a testing system that looks exactly like the production environment, only it would never serve real users. It would be used only for testing new code.

As the maturity of the cloud grows, we can now leverage the elasticity of cloud computing by building the testing system when we need it, and removing it when we are done.

At this PSP, it was central to the code quality that we could mimic a close-to-real-life system that included front-end servers as well as back-end Microsoft SQL Server-based servers. Instead of purchasing a new set of physical servers, we chose to use Microsoft Azure as an infrastructure for running automated tests, creating the needed environment prior to executing the tests, only to delete the infrastructure again 6 minutes later.

The team chose Visual Studio Team Services to implement a solution that could run an entire Continuous Integration process including build, infrastructure deployment and removal, and automated testing and reporting, delivering a set of deployable artifacts. In this solution, everything from build servers to database infrastructure would be hosted in Microsoft Azure.

#### The Continuous Integration process ####

The first step was to download the source code and all necessary dependencies:

**Visual Studio Build (aka MSBuild).** Compiles the code using the MSBuild engine and packages it into a deployable unit for later use.

**Azure Resource Group Deployment.** Builds an Azure SQL Server and attached database.

**PowerShell.** Used to import dummy data to the database for testing.

**Visual Studio Test.** Runs a long series of automatic unit tests as well as UI tests.

**Publish Test Results.** Creates a report with the outcome of the test as well as detailed logging.

**Azure Resource Group Deployment.** Removes the SQL Server and all data, and cleans up the entire deployment created earlier.

![](/images/LeadingPSP_3.png)

The rest of the build tasks then clean up the environment and publish build artifacts to Visual Studio Team Services (for later deployment).

The result of using a cloud-hosted build system is that all testing runs in the most hygienic environment possible, by provisioning a new build and test infrastructure at every test execution. (This is also referred to as a clean deployment, where no old code or dependencies can reside from earlier builds or tests.)

The automated test runs for 6-7 minutes in this case and the use of a SQL Server in Azure takes about 5 minutes.

![](/images/LeadingPSP_4.png)

This is an example of an Azure Resource Manager deployment template for creating an Azure SQL instance:

    {
    "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {
    "testingdbAdminLogin": {
    "type": "string",
    "minLength": 1
    },
    "testingdbAdminLoginPassword": {
    "type": "securestring"
    },
    "unittestdbName": {
    "type": "string",
    "minLength": 1
    },
    "unittestdbCollation": {
    "type": "string",
    "minLength": 1,
    "defaultValue": "SQL_Latin1_General_CP1_CI_AS"
    },
    "unittestdbEdition": {
    "type": "string",
    "defaultValue": "Basic",
    "allowedValues": [
    "Basic",
    "Standard",
    "Premium"
    ]
    },
    "unittestdbRequestedServiceObjectiveName": {
    "type": "string",
    "defaultValue": "Basic",
    "allowedValues": [
    "Basic",
    "S0",
    "S1",
    "S2",
    "P1",
    "P2",
    "P3"
    ],
    "metadata": {
    "description": "Describes the performance level for Edition"
    }
    }
    },
    "variables": {
    "testingdbName": "[concat('testingdb', uniqueString(resourceGroup().id))]"
    },
    "resources": [
    {
    "name": "[variables('testingdbName')]",
    "type": "Microsoft.Sql/servers",
    "location": "[resourceGroup().location]",
    "apiVersion": "2014-04-01-preview",
    "dependsOn": [ ],
    "tags": {
    "displayName": "testingdb"
    },
    "properties": {
    "administratorLogin": "[parameters('testingdbAdminLogin')]",
    "administratorLoginPassword": "[parameters('testingdbAdminLoginPassword')]"
    },
    "resources": [
    {
    "name": "AllowAllWindowsAzureIps",
    "type": "firewallrules",
    "location": "[resourceGroup().location]",
    "apiVersion": "2014-04-01-preview",
    "dependsOn": [
    "[concat('Microsoft.Sql/servers/', variables('testingdbName'))]"
    ],
    "properties": {
    "startIpAddress": "0.0.0.0",
    "endIpAddress": "0.0.0.0"
    }
    },
    {
    "name": "[parameters('unittestdbName')]",
    "type": "databases",
    "location": "[resourceGroup().location]",
    "apiVersion": "2014-04-01-preview",
    "dependsOn": [
    "[variables('testingdbName')]"
    ],
    "tags": {
    "displayName": "unittestdb"
    },
    "properties": {
    "collation": "[parameters('unittestdbCollation')]",
    "edition": "[parameters('unittestdbEdition')]",
    "maxSizeBytes": "1073741824",
    "requestedServiceObjectiveName": "[parameters('unittestdbRequestedServiceObjectiveName')]"
    }
    }
    ]
    }
    ],
    "outputs": {
    }
    }

Release management

The PSP has a fully automated deployment model, but as the Value Stream Mapping exercise showed, every delivery still had to be handled manually without any linkage to the features being deployed and their status in the delivery process. The hack team decided to showcase the release management capabilities in Visual Studio Team Services (VSTS) that would simply link everything together and give a better outlook of the delivery statuses.

![](/images/LeadingPSP_5.png)

By implementing a release management solution, the team was able to automate the deployment task execution, leveraging the existing PowerShell-based deployment model. This was done by adding deployment scripts to the application source code and having VSTS execute the script with environment-specific parameters, and repeating that task for every environment in the deployment cycle, with a different set of script arguments.

This will give the PSP an automated deployment model, where no scripts are run manually. It has a built-in approval process that dictates when a given release can be deployed to the next environment, and every approval is documented for future reference.

The solution also clearly shows what releases (and features) are currently deployed to each environment by linking work items from Visual Studio´s work management system. This enables product owners to get an overview of when features will be delivered to production. Below is a sample of an application release, and the view of how far a given release is through the deployment pipeline.

![](/images/LeadingPSP_6.png)

With this model in place, the PSP is leveraging cloud-based build, test, and release management tools and deploying to an on-premises hosted environment. This means all customer data is hosted on their own infrastructure, without ever touching the cloud. We achieved this by leveraging the build agent system in Visual Studio Team Services, and deploying an agent to a server on-premises that will work as a deployment server and push new releases to the environments.

If they later choose to deploy an application to a cloud-hosted environment, they can easily do so by changing the build agent to one that can deploy to a cloud provider.

## Conclusion ##

This PSP has a mature development cycle with some healthy practices. With the introduction of DevOps, new practices were learned and existing processes were better tied together. Prior to looking at DevOps, the deployment and development teams were struggling with interactions; now teams have started working better together.
 
The organization’s managers were quick to support the DevOps initiative, and one of the first things they implemented was the DevOps Duo program, which pairs an engineer from the development team with one from the deployment team. The DevOps Duo is the primary point of contact for an application, managing everything from planning a new feature to handling an incident. Every application has a DevOps Duo who are empowered to make decisions and to delegate tasks to fellow engineers.

Automated testing gives confidence in the quality and will enable the teams to push more changes through with the same number of engineers. The goal is that by the end of 2016, test writing will be done in tandem with coding for any new features or applications, and automated testing will be a fully integrated part of the continuous delivery.

Updating the existing code base will take time. However, they understand that addressing the legacy code base to update it to the current best practices is necessary to keep it up to standards.
Automated testing will hugely improve the time to deliver new features, and end users (clients) will get a higher quality.

The release management solution will help the organization handle repeatable tasks. They have a saying there that “What can be automated, must be automated,” and release management was the missing link. When implemented, it will give more transparency to what’s going on and help more people get insight into what runs where.

It also will enable a better segregation of duties and improve security, as fewer people will need access to the environments running the applications.

The new release management workflow is self-documenting. Prior to implementing this solution, change requests were created in a ticketing system and information about the actual releases were transferred between Dev and Ops via email. With release management, work items (changes) are linked to the actual release together with the people who worked on a given change. 

The outcome of the Hackfest will be used as a showcase to inspire other teams on how to do deployment.

*Author: Rasmus Hald, Microsoft Technical Evangelist*
