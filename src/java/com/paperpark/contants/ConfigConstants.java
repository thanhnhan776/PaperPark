/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.paperpark.contants;

import java.util.concurrent.TimeUnit;

/**
 *
 * @author NhanTT
 */
public class ConfigConstants {
    private static final int CRAWLING_DAY_INTERVAL = 1; 
    public static final long CRAWLING_INTERVAL = TimeUnit.DAYS.toMillis(CRAWLING_DAY_INTERVAL);
    public static final boolean DEBUG = false;
}
