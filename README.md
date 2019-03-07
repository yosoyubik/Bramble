# Bramble

A Blockchain Network for Public Health Interoperability and Real-Time Data Sharing.

This project was part of the [Blockchain for Social Impact Hackathon](https://www.blockchainforsocialimpact.com/hackathon/) developed between September 7th, 2017 and October 7th, 2017.

## Publication

Part of this project was used in a scietific article published by the joournal [Blockchain in Healthcare Today](https://blockchainhealthcaretoday.com/index.php/journal):

- [Public Health Surveillance using Decentralized Technologies](https://blockchainhealthcaretoday.com/index.php/journal/article/view/17)
  - Jose Luis Bellod Cisneros, Fran Aarestrup and Ole Lund

## Presentations

- [BSIC Hackathon slide deck](https://docs.google.com/presentation/d/1z9Os_uwjz1XsZmL3gLsggm6EmYvISKI69vGxIWBOk0A/edit?usp=sharing)
- [Public Health Surveillance using Blockchain](https://github.com/josl/Bramble/blob/master/HealthTech.pdf) presented at the Copenhagen Health Techers [meetup](https://www.meetup.com/Copenhagen-Health-Techers/events/243082835/)


## Challenge

Next-Generation Sequencing Technologies are creating new opportunities in the fields of animal and human health due to their rapidly decrease in cost and high-throughput of data generation. When the size and price of sequencing devices drops significantly, the technology could become used by public health institutions to perform routine clinical diagnostics.

It can be argued that these technologies have the potential to become so widespread that storing genomic information could be a problem due to the sensitivity of the data and the technological and ethical challenges arising from sharing genetic information that might be linked to future health problems for individuals.

In the context of an emerging disease data-sharing becomes critical to act rapidly for fast diagnosis and better treatment. Currently, the technology is still expensive so it’s not accessible yet to individuals. Few organizations are currently storing genomic data, most of them public institutions like the DNA Data Bank of Japan, GenBank (USA) and the European Nucleotide Archive (UK). These storage facilities are funded by public institutions and provided free and open access to the data. On the other hand data providers like sequencing labs and research organizations initially keep the data private within big silos before publication of the analysed data which goes against rapid-sharing protocols. Several other factors influence rapid and open data-sharing like patenting and intellectual property, fear of losing control over the data that can be commercialized outside their borders, reputation and economic damage...

There are few initiatives that aim to create an interoperability network for data sharing and their plan is to develop a centralized solution where all the data is stored. This creates several issues regarding the ownership of an individual's DNA and the related data that comes from the sequencing process.

## Solution

Our approach is to create a decentralised solution that relies on three technologies: 

- Decentralized storage for genomic data and associated metadata
- Smart Contracts that leave both on a Public and Private Blockchain for manage permissions
- A set of bridges that will connect to and from the public and private Blockchains that want to collaborate and participate in the exchange of information.

![Data Upload](data.jpeg?raw=true "Data Upload")


We will create a network of Blockchains using the Cosmos network where our Bramble Hub will provide the basis for managing the different users and to keep a global state across all Blockchains. The Hub will manage how data sharing of biological assets is guaranteed, provide the infrastructure to be connected to other zones (Ethereum, private chains…) and implements governance mechanism to coordinate all participants of the network
A Network of private/public Blockchains (vis Cosmos)

![Bramble Network](overview.jpeg?raw=true "Bramble Network")

Private Blockchains will exist (restricted set of validators (i.e. full nodes), privacy...). Healthcare can be considered an oligopoly of oligopolies: Pharma oligopoly, national public-health systems, insurance, health researchers. Some of them keep siloed data private and others contribute to a common body of public knowledge. 

The question is, how do se establish a protocol for data sharing that ensures privacy but encourages exchange of information. 

## Terminology 
- Zones
- Hubs
- Bridging
  - Bridge Contracts
  - Bridge Zones
- Application Blockchain Interface (ABCI)
- Atom: Staking token to keep consensus on the network.

References
https://cosmos.network/whitepaper

