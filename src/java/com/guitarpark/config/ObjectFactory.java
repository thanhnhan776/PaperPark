//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.5-2 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2019.07.03 at 02:19:28 AM ICT 
//


package com.guitarpark.config;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the com.guitarpark.schema.crawler_config package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _Configs_QNAME = new QName("http://www.guitarpark.com/schema/crawler-config", "configs");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: com.guitarpark.schema.crawler_config
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link CrawlerConfig }
     * 
     */
    public CrawlerConfig createCrawlerConfig() {
        return new CrawlerConfig();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link CrawlerConfig }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://www.guitarpark.com/schema/crawler-config", name = "configs")
    public JAXBElement<CrawlerConfig> createConfigs(CrawlerConfig value) {
        return new JAXBElement<CrawlerConfig>(_Configs_QNAME, CrawlerConfig.class, null, value);
    }

}
