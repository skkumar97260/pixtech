import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import Header from "../../../Components/header";
import MainHeader from "../../../Components/mainheader";
import Footer from "../../../Components/footer";
import slide1 from "../../../Assests/Images/pagetitle_bg.jpg";

// Web Application Data
const webData = {
    title: "Web Application Development",
    breadcrumb: ["Home", "Web Application Development"],
    introduction: [
        "PIXALIVE TECHNOLOGY SERVICES is a full-service web application development company focused on building world-class applications using the latest technology trends. It's a crucial online channel, and its development must begin with clear goals, objectives, and a detailed scope of work.",
        "We are experienced in developing advanced systems with complex business logic dealing with large amounts of data and transactions. We will provide you with an innovative, trustworthy web application solution to complement your business ideas."
    ],
    expertiseTitle: "Our Expertise in Web Application Development",
    expertiseDescription:
        "PIXALIVE specialists use up-to-date technologies to deliver technically complex and yet easy-to-use solutions with the minimal cost/performance ratio.",
    services: [
        {
            category: "PHP Development Services",
            details: [
                { name: "Frameworks", technologies: "CodeIgniter (CI), Zend, Symfony, YII, CakePHP, Laravel" },
                { name: "Open Source", technologies: "WordPress, Joomla, Magento, Drupal" },
                { name: "Databases", technologies: "MySQL 5.x, PostgreSQL" }
            ]
        },
        {
            category: "Java Development Services",
            details: [
                { name: "Java Programming", technologies: "JSP, EJB, JSF, Java Applets, Java Servlets, Java Messaging Services" },
                { name: "Application Server", technologies: "Apache/Tomcat, BEA WebLogic, IBM WebSphere, JBoss Application Server" },
                { name: "MVC Frameworks", technologies: "STRUTS, Spring" },
                { name: "Databases", technologies: "MySQL, Oracle, Hibernate" },
                { name: "IDE's", technologies: "Eclipse, NetBeans, JDeveloper" }
            ]
        },
        {
            category: "ASP.Net Development Services",
            details: [
                { name: "Web and Desktop Applications", technologies: "ASP.NET, AJAX, Windows Workflow Foundation, Silverlight, SharePoint" },
                { name: "Open Source", technologies: "NHibernate, Log4Net, Spring.NET, Quartz.NET" },
                { name: "Databases", technologies: "SQL Server 2005/2008, Oracle 8i/9i/10g" }
            ]
        }
    ],
    callToAction: {
        text: "If you are looking for the right company to outsource, we are the best in the market.",
        linkText: "Let’s talk.",
        linkUrl: "/contact"
    }
};

const Web = () => {
    return (
        <div>
            <Header />
            <MainHeader />

            {/* Hero Section */}
            <div className="relative bg-gray-900 h-[180px] -z-10">
                <img src={slide1} alt="Web Application Development" className="w-full h-full object-cover bg-black opacity-40" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-16 text-white text-center md:text-left bottom-48">
                    <div className="border-l-4 border-yellow-600 p-2">
                        <h1 className="lg:text-5xl text-xl font-bold mb-4">{webData.title}</h1>
                        <div className="flex items-center space-x-2">
                            {webData.breadcrumb.map((item, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <FaGreaterThan className="h-3 w-3" />}
                                    <span>{item}</span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                
                {/* Introduction Section */}
                <section className="mb-8">
                    {webData.introduction.map((paragraph, index) => (
                        <p key={index} className="text-lg text-gray-700 mb-4">{paragraph}</p>
                    ))}
                </section>

                {/* Expertise Section */}
                <section className="mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">{webData.expertiseTitle}</h1>
                    <p className="text-lg text-gray-700">{webData.expertiseDescription}</p>
                </section>

                {/* Services Section */}
                {webData.services.map((service, serviceIndex) => (
                    <section key={serviceIndex} className="mb-8">
                        <h2 className="text-xl font-bold mb-4">{service.category}:</h2>
                        <table className="table-auto w-full border border-gray-300">
                            <tbody>
                                {service.details.map((detail, detailIndex) => (
                                    <tr key={detailIndex} className="border-b border-gray-300">
                                        <td className="p-4 font-medium">{detail.name}</td>
                                        <td className="p-4 border-l">{detail.technologies}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                ))}

                {/* Call to Action */}
                <section className="text-center mt-8">
                    <p className="text-lg text-gray-700">
                        {webData.callToAction.text}
                        <a href={webData.callToAction.linkUrl} className="text-blue-500 font-medium ml-1 hover:underline">
                            {webData.callToAction.linkText}
                        </a>
                    </p>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default Web;
