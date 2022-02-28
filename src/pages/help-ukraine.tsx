import React, { useEffect } from "react";

export default function HelpUkraine() {

    useEffect(function () {
        const styleTag = document.createElement("style");
        styleTag.textContent = `
        body {
            margin: 2rem auto;
            max-width: min(calc(100vw - 4rem), 30rem);
        }
        h1 { text-align: center }
        `;

        document.head.append(styleTag);

        return function () {
            styleTag.remove();
        }

    }, []);

    return <div>
        <h1>🇺🇦 Donations for Ukraine 🇺🇦</h1>
        <p>
            <a href="https://twitter.com/KyivIndependent/status/1475104548083617792"
                target="_blank"><span>Charities that help the war effort</span></a></p>
        <ul>
            <li>
                <p><a href="https://savelife.in.ua/donate/" target="_blank">Save Life</a>: This NGO
                    crowdfunds non-lethal military equipment, such as thermal vision scopes &amp; supplies it to the Donbas
                    front lines. It also provides training for Ukrainian soldiers, as well as researching troops’ needs and
                    social reintegration of veterans.</p>
            </li>
            <li>
                <p><a href="https://www.donbasssos.org/en/" target="_blank">Donbas SOS</a>: This
                    organization helps those who live in the Donbas war zone, those who relocated to other parts of Ukraine, and
                    freed prisoners of war. It offers legal support, accommodation assistance, and psychological aid among other
                    things.</p>
            </li>
            <li>
                <p><a href="https://krymsos.com/" target="_blank">Crimea SOS</a>: This organization
                    has been helping internally displaced people from Crimea since Russia occupied the peninsula in 2014. It
                    documents Russian authorities' repressions against Crimeans and advocates for the end of the occupation.</p>
            </li>
            <li>
                <p><a href="https://facebook.com/hospitallers/"
                    target="_blank">Hospitallers&nbsp;</a>: This is a medical battalion that unites volunteer paramedics and
                    doctors to save the lives of soldiers on the frontline. They crowdfund their vehicle repairs, fuel, and
                    medical equipment.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1474762967581442054"
            target="_blank"><span>Charities that help children</span></a></p>
        <ul>
            <li>
                <p><a href="https://tabletochki.org/" target="_blank">Tabletochki</a>: This
                    foundation has been supporting children with cancer for 10 years. They procure medicines, equipment, and
                    arrange overseas treatment, among other things.</p>
            </li>
            <li>
                <p><a href="https://vstygnemo.org.ua/" target="_blank">ChildrenWeWillMakeIt</a>:
                    This movement grew out of a campaign that raised $2 million to get the world's most expensive medicine for a
                    Ukrainian boy with spinal muscular atrophy. It now fundraises for the treatment of other Ukrainian children
                    with SMA.</p>
            </li>
            <li>
                <p><a href="https://ruka-ob-ruku.com.ua/en/index.html" target="_blank">Ruka ob
                    Ruku</a>: This is a running club for children with disabilities. The initiative gives children an
                    opportunity to train and take part in races together with their parents and volunteers.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1477953071103815683"
            target="_blank"><span>Charities for the elderly</span></a></p>
        <ul>
            <li>
                <p><a href="https://happyold.com.ua/" target="_blank">Happy Old</a>: This charity
                    provides older people across Ukraine with groceries and medicine, holds educational, entertainment, and
                    sports events, as well as helps with employment. They even created a modeling agency for the elderly.</p>
            </li>
            <li>
                <p><a href="https://letshelp.com.ua/" target="_blank">Let's Help</a>: This charity
                    cares for older people living alone and helps state retirement homes. They also advocate for better
                    treatment of older people by the state, including providing people aged 60+ with easy access to education.
                </p>
            </li>
            <li>
                <p><a href="https://starenki.com.ua/" target="_blank">Starenki</a>: It’s a
                    charitable initiative devoted to issues of old age in Ukraine. They help lonely seniors by providing them
                    with groceries and hygiene products.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1478810123900534785"
            target="_blank"><span>Charities that help women</span></a></p>
        <ul>
            <li>
                <p><a href="http://women.lviv.ua/" target="_blank">Women Perspectives</a>: This
                    organization has been helping women who have faced domestic violence, discrimination in the labor market,
                    and other issues. The NGO works with local and state authorities to promote pro-equality gender policies in
                    Ukraine.</p>
            </li>
            <li>
                <p><a href="https://marsh-zhinok.com.ua/" target="_blank">Marsh Zhinok (Women’s
                    March)</a>: Every year, on March 8, this initiative holds a rally promoting gender equality and the
                    protection of women from gender-based violence. Currently, the organization is petitioning for Ukraine to
                    adopt the Istanbul Convention.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1477647902956740608"
            target="_blank"><span>Charities for blood donation</span></a></p>
        <ul>
            <li>
                <p><a href="https://t.co/YeSSktWhJK" target="_blank">Blood Agents</a>: It is an NGO
                    that promotes regular, conscious and gratuitous blood donations. They have encouraged people to donate blood
                    over 5,000 times over the past six years.</p>
            </li>
            <li>
                <p><a href="https://www.donor.ua/" target="_blank">Donor UA</a>: It is an automated
                    system for recruiting and managing blood donors, designed to promote the donor movement in Ukraine. You can
                    help by signing up and donating blood or by supporting the project with money donation.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1477279880245088259"
            target="_blank"><span>Charities for animals</span></a></p>
        <ul>
            <li>
                <p><a href="https://dogcat.com.ua/" target="_blank">Sirius</a>: Is the largest
                    shelter for stray animals in Ukraine established in 2000. Its capacity is over 3,000 animals. The
                    institution crowdfunds for animal feed, veterinary drugs, construction and repair of enclosures, and other
                    needs.</p>
            </li>
            <li>
                <p><a href="https://happypaw.ua/ua" target="_blank">Happy Paw</a>: Is a charity
                    dedicated to solving the problems of homeless animals in Ukraine. The charity helps owners find lost
                    animals, sterilizes domestic animals of people in need &amp; holds lectures on humane treatment of homeless
                    animals for schoolchildren.</p>
            </li>
            <li>
                <p><a href="https://www.facebook.com/UAnimals.official/"
                    target="_blank">UAnimals</a>: Is a movement for protecting animals from exploitation &amp; abuse. The
                    organization managed to achieve a ban on animal circuses &amp; persuaded many designers participating in
                    Ukrainian Fashion Week to abandon natural fur.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1476865614673289228"
            target="_blank"><span>Charities for the environment</span></a></p>
        <ul>
            <li>
                <p><a href="https://nowaste.com.ua/" target="_blank">Ukraine Without Waste</a>: It
                    is a Ukrainian non-profit promoting the practice of sorting household waste. They educate companies on how
                    to go green at their offices, and hold lectures for the wider public.</p>
            </li>
            <li>
                <p><a href="https://laskastore.com/" target="_blank">Laska</a>: It’s a chain of two
                    charity stores in Kyiv that promote conscious shopping. They accept donated clothes, resell 15% of them, and
                    send the rest to orphanages, homes for the elderly and centers for people with disabilities.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1476514193004187650"
            target="_blank"><span>Charities for the homeless</span></a></p>
        <ul>
            <li>
                <p><a href="https://m.facebook.com/pomogi.bezdomnomu/?__nodl&amp;ref=external%3At.co&amp;_rdr"
                    target="_blank">Help the homeless</a>: This initiative supports homeless
                    people &amp; the elderly in need, by providing them with free meals, medicine, hygiene products, clothes
                    &amp; shoes. Launched by a group of volunteers in 2016, the organization has been relying on crowdfunding.
                </p>
            </li>
            <li>
                <p><a href="https://t.co/oBWjKmjs0a" target="_blank">Suka Zhizn</a>: This
                    organization grew big from a 2017 Instagram account launched to tell stories of homeless people. Now
                    volunteers provide various support to the homeless: employment, sorting out documents, searching for
                    relatives &amp; legal counseling.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1476170616432640007"
            target="_blank"><span>Charities for investigative journalism</span></a></p>
        <ul>
            <li>
                <p><a href="https://t.co/nbG0czw6Nk" target="_blank">Slidstvo</a>: Is an independent
                    agency launched in 2012 that produces award-winning documentaries exposing corruption. They have
                    investigated mismanagement of prisons, fraud, money laundering at PrivatBank &amp; the assassination of
                    journalist Sheremet.</p>
            </li>
            <li>
                <p><a href="https://t.co/UYGHkmShOo" target="_blank">UKRPravda News</a>: Founded in
                    2000 by Gongadze, a prominent journalist who was killed the same year, this publication is among the most
                    influential in Ukraine. The reporters break political scoops and unmask officials who abuse their power.</p>
            </li>
            <li>
                <p><a href="https://zaborona.com/" target="_blank">Zaborona Media</a>: This is an
                    independent media outlet founded by journalists. They investigate topics such as violations of Ukrainian
                    workers’ rights in the Middle East, arms trafficking, and corruption in the construction sector.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1475820631509942273"
            target="_blank"><span>Charities that preserve Ukrainian cultural heritage</span></a></p>
        <ul>
            <li>
                <p><a href="http://museumparhomovka.com.ua/" target="_blank">Parkhomivka Museum</a>:
                    The museum, located in a small village in eastern Kharkiv Oblast, is an 18th-century villa that offers a
                    permanent collection of exhibits by artists as iconic as Picasso, Malevich &amp; Manet. You can support it
                    by coming &amp; buying a ticket.</p>
            </li>
            <li>
                <p><a href="https://t.co/QHfs9rYB3T" target="_blank">Save Kyiv Modernism</a>: Is a
                    movement that unites architects, designers and activists who advocate for the protection of the remarkable
                    Soviet modernist structures across Ukraine.</p>
            </li>
            <li>
                <p><a href="https://www.facebook.com/groups/342879319403810/?ref=share"
                    target="_blank">FrankivskToCareAbout</a>: Is a movement for the preservation of architectural heritage
                    in the western city of Ivano-Frankivsk. Founded in 2016, the initiative renovates old wooden doors of the
                    city's ancient buildings.</p>
            </li>
        </ul>
        <p><a href="https://twitter.com/KyivIndependent/status/1475402245349031938"
            target="_blank"><span>Charities helping with covid</span></a></p>
        <ul>
            <li>
                <p><a href="http://svoyi.com.ua/" target="_blank">Svoyi</a>: Svoyi gives free oxygen
                    concentrators to people who contracted COVID &amp; can’t be hospitalized due to personal circumstances or
                    when hospitals are overflowing. It also helps those discharged too early in favour of patients in more
                    serious conditions.</p>
            </li>
            <li>
                <p><a href="http://monstrov.org/" target="_blank">Monsters, Inc.</a>: This
                    organization is based in Odesa and provides emergency medical aid to people living in the region. They also
                    help COVID hospitals, procuring medicines and equipment.</p>
            </li>
        </ul>
        <hr/>
        This list was originally posted in <a target="_blank" href="https://www.reddit.com/r/ukraine/comments/s6g5un/want_to_support_ukraine_heres_a_list_of_charities/">Ukraine's subreddit</a> and is based on
        information by <a target="_blank" href="https://twitter.com/KyivIndependent">The Kyiv Independent</a>, an Ukranian media organization that covers the invasion.
    </div>
}