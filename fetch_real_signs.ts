import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { dangerSigns, regulatorySigns, infoSigns } from './src/data/signs_data';

// Full scraped data from Wikimedia (KOK 2009 series)
const scrapedData = [
    { "code": "K-1α", "url": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Traffic_Sign_GR_-_KOK_2009_-_%CE%9A-1%CE%B1.svg" },
    { "code": "K-1δ", "url": "https://upload.wikimedia.org/wikipedia/commons/7/72/Traffic_Sign_GR_-_KOK_2009_-_%CE%9A-1%CE%B4.svg" },
    { "code": "K-2α", "url": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Traffic_Sign_GR_-_KOK_2009_-_%CE%9A-2%CE%B1.svg" },
    { "code": "K-2δ", "url": "https://upload.wikimedia.org/wikipedia/commons/0/03/Traffic_Sign_GR_-_KOK_2009_-_%CE%9A-2%CE%B4.svg" },
    { "code": "K-3", "url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Traffic_Sign_GR_-_KOK_2009_-_%CE%9A-3.svg" },
    { "code": "K-4", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e5/Traffic_Sign_GR_-_KOK_2009_-_%CE%9A-4.svg" },
    { "code": "K-5", "url": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Traffic_Sign_GR_-_KOK_2009_-_K-5.svg" },
    { "code": "K-6a", "url": "https://upload.wikimedia.org/wikipedia/commons/5/58/Traffic_Sign_GR_-_KOK_2009_-_K-6a.svg" },
    { "code": "K-6d", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a3/Traffic_Sign_GR_-_KOK_2009_-_K-6d.svg" },
    { "code": "K-7", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Traffic_Sign_GR_-_KOK_2009_-_K-7.svg" },
    { "code": "K-8", "url": "https://upload.wikimedia.org/wikipedia/commons/8/89/Traffic_Sign_GR_-_KOK_2009_-_K-8.svg" },
    { "code": "K-9", "url": "https://upload.wikimedia.org/wikipedia/commons/7/79/Traffic_Sign_GR_-_KOK_2009_-_K-9.svg" },
    { "code": "K-10", "url": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Traffic_Sign_GR_-_KOK_2009_-_K-10.svg" },
    { "code": "K-11", "url": "https://upload.wikimedia.org/wikipedia/commons/4/40/Traffic_Sign_GR_-_KOK_2009_-_K-11.svg" },
    { "code": "K-12", "url": "https://upload.wikimedia.org/wikipedia/commons/4/44/Traffic_Sign_GR_-_KOK_2009_-_K-12.svg" },
    { "code": "K-13", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Traffic_Sign_GR_-_KOK_2009_-_K-13.svg" },
    { "code": "K-14", "url": "https://upload.wikimedia.org/wikipedia/commons/1/17/Traffic_Sign_GR_-_KOK_2009_-_K-14.svg" },
    { "code": "K-15", "url": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Traffic_Sign_GR_-_KOK_2009_-_K-15.svg" },
    { "code": "K-16", "url": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Traffic_Sign_GR_-_KOK_2009_-_K-16.svg" },
    { "code": "K-17", "url": "https://upload.wikimedia.org/wikipedia/commons/9/92/Traffic_Sign_GR_-_KOK_2009_-_K-17.svg" },
    { "code": "K-18", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Traffic_Sign_GR_-_KOK_2009_-_K-18.svg" },
    { "code": "K-19", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Traffic_Sign_GR_-_KOK_2009_-_K-19.svg" },
    { "code": "K-20", "url": "https://upload.wikimedia.org/wikipedia/commons/0/08/Traffic_Sign_GR_-_KOK_2009_-_K-20.svg" },
    { "code": "K-21", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Traffic_Sign_GR_-_KOK_2009_-_K-21.svg" },
    { "code": "K-22", "url": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Traffic_Sign_GR_-_KOK_2009_-_K-22.svg" },
    { "code": "K-23", "url": "https://upload.wikimedia.org/wikipedia/commons/3/34/Traffic_Sign_GR_-_KOK_2009_-_K-23.svg" },
    { "code": "K-24", "url": "https://upload.wikimedia.org/wikipedia/commons/5/55/Traffic_Sign_GR_-_KOK_2009_-_K-24.svg" },
    { "code": "K-25", "url": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Traffic_Sign_GR_-_KOK_2009_-_K-25.svg" },
    { "code": "K-26", "url": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Traffic_Sign_GR_-_KOK_2009_-_K-26.svg" },
    { "code": "K-27", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Traffic_Sign_GR_-_KOK_2009_-_K-27.svg" },
    { "code": "K-28a", "url": "https://upload.wikimedia.org/wikipedia/commons/0/02/Traffic_Sign_GR_-_KOK_2009_-_K-28a.svg" },
    { "code": "K-29a", "url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Traffic_Sign_GR_-_KOK_2009_-_K-29a.svg" },
    { "code": "K-30", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Traffic_Sign_GR_-_KOK_2009_-_K-30.svg" },
    { "code": "K-31", "url": "https://upload.wikimedia.org/wikipedia/commons/6/63/Traffic_Sign_GR_-_KOK_2009_-_K-31.svg" },
    { "code": "K-32", "url": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Traffic_Sign_GR_-_KOK_2009_-_K-32.svg" },
    { "code": "K-33", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Traffic_Sign_GR_-_KOK_2009_-_K-33.svg" },
    { "code": "K-34", "url": "https://upload.wikimedia.org/wikipedia/commons/4/46/Traffic_Sign_GR_-_KOK_2009_-_K-34.svg" },
    { "code": "K-35", "url": "https://upload.wikimedia.org/wikipedia/commons/b/b0/Traffic_Sign_GR_-_KOK_2009_-_K-35.svg" },
    { "code": "K-36", "url": "https://upload.wikimedia.org/wikipedia/commons/4/4a/Traffic_Sign_GR_-_KOK_2009_-_K-36.svg" },
    { "code": "K-37", "url": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Traffic_Sign_GR_-_KOK_2009_-_K-37.svg" },
    { "code": "K-38a", "url": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Traffic_Sign_GR_-_KOK_2009_-_K-38a.svg" },
    { "code": "K-39", "url": "https://upload.wikimedia.org/wikipedia/commons/1/13/Traffic_Sign_GR_-_KOK_2009_-_K-39.svg" },
    { "code": "K-40", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Traffic_Sign_GR_-_KOK_2009_-_K-40.svg" },
    { "code": "K-41", "url": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Traffic_Sign_GR_-_KOK_2009_-_K-41.svg" },
    { "code": "K-42", "url": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Traffic_Sign_GR_-_KOK_-_K-42.svg" },
    { "code": "K-43", "url": "https://upload.wikimedia.org/wikipedia/commons/7/78/Traffic_Sign_GR_-_KOK_-_K-43.svg" },
    { "code": "K-44", "url": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Traffic_Sign_GR_-_KOK_-_K-44.svg" },
    { "code": "R-1", "url": "https://upload.wikimedia.org/wikipedia/commons/7/70/Traffic_Sign_GR_-_KOK_2009_-_R-1.svg" },
    { "code": "R-2", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Traffic_Sign_GR_-_KOK_2009_-_R-2.svg" },
    { "code": "R-3", "url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Traffic_Sign_GR_-_KOK_2009_-_R-3.svg" },
    { "code": "R-4", "url": "https://upload.wikimedia.org/wikipedia/commons/c/c2/Traffic_Sign_GR_-_KOK_2009_-_R-4.svg" },
    { "code": "R-5", "url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Traffic_Sign_GR_-_KOK_2009_-_R-5.svg" },
    { "code": "R-6", "url": "https://upload.wikimedia.org/wikipedia/commons/5/55/Traffic_Sign_GR_-_KOK_2009_-_R-6.svg" },
    { "code": "R-7", "url": "https://upload.wikimedia.org/wikipedia/commons/d/df/Traffic_Sign_GR_-_KOK_2009_-_R-7.svg" },
    { "code": "R-8", "url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Traffic_Sign_GR_-_KOK_2009_-_R-8.svg" },
    { "code": "R-9", "url": "https://upload.wikimedia.org/wikipedia/commons/6/63/Traffic_Sign_GR_-_KOK_2009_-_R-9.svg" },
    { "code": "R-10", "url": "https://upload.wikimedia.org/wikipedia/commons/6/60/Traffic_Sign_GR_-_KOK_2009_-_R-10.svg" },
    { "code": "R-11", "url": "https://upload.wikimedia.org/wikipedia/commons/2/20/Traffic_Sign_GR_-_KOK_2009_-_R-11.svg" },
    { "code": "R-12", "url": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Traffic_Sign_GR_-_KOK_2009_-_R-12.svg" },
    { "code": "R-13", "url": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Traffic_Sign_GR_-_KOK_2009_-_R-13.svg" },
    { "code": "R-14", "url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/Traffic_Sign_GR_-_KOK_2009_-_R-14.svg" },
    { "code": "R-15", "url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Traffic_Sign_GR_-_KOK_2009_-_R-15.svg" },
    { "code": "R-16", "url": "https://upload.wikimedia.org/wikipedia/commons/d/db/Traffic_Sign_GR_-_KOK_2009_-_R-16.svg" },
    { "code": "R-17", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Traffic_Sign_GR_-_KOK_2009_-_R-17.svg" },
    { "code": "R-18", "url": "https://upload.wikimedia.org/wikipedia/commons/1/17/Traffic_Sign_GR_-_KOK_2009_-_R-18.svg" },
    { "code": "R-19", "url": "https://upload.wikimedia.org/wikipedia/commons/a/af/Traffic_Sign_GR_-_KOK_2009_-_R-19.svg" },
    { "code": "R-20", "url": "https://upload.wikimedia.org/wikipedia/commons/0/01/Traffic_Sign_GR_-_KOK_2009_-_R-20.svg" },
    { "code": "R-21", "url": "https://upload.wikimedia.org/wikipedia/commons/4/4d/Traffic_Sign_GR_-_KOK_2009_-_R-21.svg" },
    { "code": "R-22", "url": "https://upload.wikimedia.org/wikipedia/commons/1/15/Traffic_Sign_GR_-_KOK_2009_-_R-22.svg" },
    { "code": "R-23", "url": "https://upload.wikimedia.org/wikipedia/commons/9/9e/Traffic_Sign_GR_-_KOK_2009_-_R-23.svg" },
    { "code": "R-24", "url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Traffic_Sign_GR_-_KOK_2009_-_R-24.svg" },
    { "code": "R-25", "url": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Traffic_Sign_GR_-_KOK_2009_-_R-25.svg" },
    { "code": "R-26", "url": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Traffic_Sign_GR_-_KOK_2009_-_R-26.svg" },
    { "code": "R-27", "url": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Traffic_Sign_GR_-_KOK_2009_-_R-27.svg" },
    { "code": "R-28", "url": "https://upload.wikimedia.org/wikipedia/commons/a/af/Traffic_Sign_GR_-_KOK_2009_-_R-28.svg" },
    { "code": "R-29", "url": "https://upload.wikimedia.org/wikipedia/commons/0/07/Traffic_Sign_GR_-_KOK_2009_-_R-29.svg" },
    { "code": "R-30", "url": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Traffic_Sign_GR_-_KOK_2009_-_R-30.svg" },
    { "code": "R-31", "url": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Traffic_Sign_GR_-_KOK_2009_-_R-31.svg" },
    { "code": "R-32", "url": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Traffic_Sign_GR_-_KOK_2009_-_R-32_-_10_kph.svg" },
    { "code": "R-33", "url": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Traffic_Sign_GR_-_KOK_2009_-_R-33.svg" },
    { "code": "R-34", "url": "https://upload.wikimedia.org/wikipedia/commons/a/af/Traffic_Sign_GR_-_KOK_2009_-_R-34.svg" },
    { "code": "R-35", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Traffic_Sign_GR_-_KOK_2009_-_R-35.svg" },
    { "code": "R-36", "url": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Traffic_Sign_GR_-_KOK_2009_-_R-36.svg" },
    { "code": "R-37", "url": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Traffic_Sign_GR_-_KOK_2009_-_R-37.svg" },
    { "code": "R-38", "url": "https://upload.wikimedia.org/wikipedia/commons/3/37/Traffic_Sign_GR_-_KOK_2009_-_R-38.svg" },
    { "code": "R-39", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Traffic_Sign_GR_-_KOK_2009_-_R-39.svg" },
    { "code": "R-40", "url": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Traffic_Sign_GR_-_KOK_2009_-_R-40.svg" },
    { "code": "R-41", "url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Traffic_Sign_GR_-_KOK_2009_-_R-41.svg" },
    { "code": "R-42", "url": "https://upload.wikimedia.org/wikipedia/commons/7/71/Traffic_Sign_GR_-_KOK_2009_-_R-42.svg" },
    { "code": "R-43", "url": "https://upload.wikimedia.org/wikipedia/commons/2/2a/Traffic_Sign_GR_-_KOK_2009_-_R-43.svg" },
    { "code": "R-44", "url": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Traffic_Sign_GR_-_KOK_2009_-_R-44.svg" },
    { "code": "R-45", "url": "https://upload.wikimedia.org/wikipedia/commons/2/20/Traffic_Sign_GR_-_KOK_2009_-_R-45.svg" },
    { "code": "R-46", "url": "https://upload.wikimedia.org/wikipedia/commons/0/0a/Traffic_Sign_GR_-_KOK_2009_-_R-46.svg" },
    { "code": "R-47", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e8/Traffic_Sign_GR_-_KOK_2009_-_R-47.svg" },
    { "code": "R-48", "url": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Traffic_Sign_GR_-_KOK_2009_-_R-48.svg" },
    { "code": "R-49", "url": "https://upload.wikimedia.org/wikipedia/commons/b/bd/Traffic_Sign_GR_-_KOK_2009_-_R-49.svg" },
    { "code": "R-50", "url": "https://upload.wikimedia.org/wikipedia/commons/8/87/Traffic_Sign_GR_-_KOK_2009_-_R-50.svg" },
    { "code": "R-50a", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Traffic_Sign_GR_-_KOK_2009_-_R-50a.svg" },
    { "code": "R-51a", "url": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Traffic_Sign_GR_-_KOK_2009_-_R-51a.svg" },
    { "code": "R-52", "url": "https://upload.wikimedia.org/wikipedia/commons/7/75/Traffic_Sign_GR_-_KOK_2009_-_R-52.svg" },
    { "code": "R-52a", "url": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Traffic_Sign_GR_-_KOK_2009_-_R-52a.svg" },
    { "code": "R-53", "url": "https://upload.wikimedia.org/wikipedia/commons/2/20/Traffic_Sign_GR_-_KOK_2009_-_R-53.svg" },
    { "code": "R-54", "url": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Traffic_Sign_GR_-_KOK_2009_-_R-54.svg" },
    { "code": "R-55", "url": "https://upload.wikimedia.org/wikipedia/commons/8/84/Traffic_Sign_GR_-_KOK_2009_-_R-55.svg" },
    { "code": "R-56", "url": "https://upload.wikimedia.org/wikipedia/commons/0/05/Traffic_Sign_GR_-_KOK_2009_-_R-56.svg" },
    { "code": "R-57", "url": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Traffic_Sign_GR_-_KOK_2009_-_R-57.svg" },
    { "code": "R-58", "url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Traffic_Sign_GR_-_KOK_2009_-_R-58.svg" },
    { "code": "R-59", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Traffic_Sign_GR_-_KOK_2009_-_R-59.svg" },
    { "code": "R-60", "url": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Traffic_Sign_GR_-_KOK_2009_-_R-60.svg" },
    { "code": "R-61", "url": "https://upload.wikimedia.org/wikipedia/commons/0/00/Traffic_Sign_GR_-_KOK_2009_-_R-61.svg" },
    { "code": "R-62", "url": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Traffic_Sign_GR_-_KOK_2009_-_R-62.svg" },
    { "code": "R-63", "url": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Traffic_Sign_GR_-_KOK_2009_-_R-63.svg" },
    { "code": "R-64", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e1/Traffic_Sign_GR_-_KOK_2009_-_R-64.svg" },
    { "code": "R-65", "url": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Traffic_Sign_GR_-_KOK_2009_-_R-65.svg" },
    { "code": "R-66", "url": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Traffic_Sign_GR_-_KOK_2009_-_R-66.svg" },
    { "code": "R-66a", "url": "https://upload.wikimedia.org/wikipedia/commons/7/71/Traffic_Sign_GR_-_KOK_2009_-_R-66a.svg" },
    { "code": "R-67", "url": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Traffic_Sign_GR_-_KOK_2009_-_R-67.svg" },
    { "code": "R-68", "url": "https://upload.wikimedia.org/wikipedia/commons/4/47/Traffic_Sign_GR_-_KOK_2009_-_R-68.svg" },
    { "code": "R-69", "url": "https://upload.wikimedia.org/wikipedia/commons/1/1e/Traffic_Sign_GR_-_KOK_2009_-_R-69.svg" },
    { "code": "R-70", "url": "https://upload.wikimedia.org/wikipedia/commons/5/59/Traffic_Sign_GR_-_KOK_2009_-_R-70.svg" },
    { "code": "R-71", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Traffic_Sign_GR_-_KOK_2009_-_R-71.svg" },
    { "code": "R-72", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Traffic_Sign_GR_-_KOK_2009_-_R-72.svg" },
    { "code": "R-75", "url": "https://upload.wikimedia.org/wikipedia/commons/5/58/Traffic_Sign_GR_-_KOK_2009_-_R-75.svg" },
    { "code": "R-76", "url": "https://upload.wikimedia.org/wikipedia/commons/c/cf/Traffic_Sign_GR_-_KOK_2009_-_R-76.svg" },
    { "code": "R-77", "url": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Traffic_Sign_GR_-_KOK_2009_-_R-77.svg" },
    { "code": "P-3", "url": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Traffic_Sign_GR_-_KOK_new_-_P-3.svg" },
    { "code": "P-4", "url": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Traffic_Sign_GR_-_KOK_2009_-_P-4.svg" },
    { "code": "P-5", "url": "https://upload.wikimedia.org/wikipedia/commons/f/f4/Traffic_Sign_GR_-_KOK_2009_-_P-5.svg" },
    { "code": "P-6", "url": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Traffic_Sign_GR_-_KOK_2009_-_P-6.svg" },
    { "code": "P-7", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Traffic_Sign_GR_-_KOK_2009_-_P-7.svg" },
    { "code": "P-8a", "url": "https://upload.wikimedia.org/wikipedia/commons/5/53/Traffic_Sign_GR_-_KOK_new_-_P-8a.svg" },
    { "code": "P-9", "url": "https://upload.wikimedia.org/wikipedia/commons/7/70/Traffic_Sign_GR_-_KOK_new_-_P-9.svg" },
    { "code": "P-10", "url": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Traffic_Sign_GR_-_KOK_2009_-_P-10.svg" },
    { "code": "P-11", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Greek_traffic_sign_P-11.png" },
    { "code": "P-12", "url": "https://upload.wikimedia.org/wikipedia/commons/0/07/Greek_traffic_sign_P-12.png" },
    { "code": "P-15", "url": "https://upload.wikimedia.org/wikipedia/commons/4/42/Traffic_Sign_GR_-_KOK_2009_-_P-15.svg" },
    { "code": "P-16", "url": "https://upload.wikimedia.org/wikipedia/commons/1/17/Traffic_Sign_GR_-_KOK_2009_-_P-16.svg" },
    { "code": "P-17", "url": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Traffic_Sign_GR_-_KOK_2009_-_P-17_%28new_font%29_-_Thessaloniki.svg" },
    { "code": "P-18", "url": "https://upload.wikimedia.org/wikipedia/commons/1/10/Traffic_Sign_GR_-_KOK_2009_-_P-18_%28new_font%29_-_Thessaloniki.svg" },
    { "code": "P-19", "url": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Traffic_Sign_GR_-_KOK_2009_-_P-19.svg" },
    { "code": "P-21", "url": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Traffic_Sign_GR_-_KOK_2009_-_P-21.svg" },
    { "code": "P-22", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Traffic_Sign_GR_-_KOK_2009_-_P-22.svg" },
    { "code": "P-23", "url": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Traffic_Sign_GR_-_KOK_2009_-_P-23.svg" },
    { "code": "P-25", "url": "https://upload.wikimedia.org/wikipedia/commons/4/42/Traffic_Sign_GR_-_KOK_2009_-_P-25.svg" },
    { "code": "P-26", "url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Traffic_Sign_GR_-_KOK_2009_-_%CE%A0-26.svg" },
    { "code": "P-27", "url": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Traffic_Sign_GR_-_KOK_2009_-_P-27.svg" },
    { "code": "P-28", "url": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Traffic_Sign_GR_-_KOK_2009_-_P-28.svg" },
    { "code": "P-29", "url": "https://upload.wikimedia.org/wikipedia/commons/1/12/Traffic_Sign_GR_-_KOK_2009_-_P-29.svg" },
    { "code": "P-30", "url": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Traffic_Sign_GR_-_KOK_2009_-_%CE%A0-30.svg" },
    { "code": "P-31", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Traffic_Sign_GR_-_KOK_2009_-_P-31.svg" },
    { "code": "P-32", "url": "https://upload.wikimedia.org/wikipedia/commons/8/8c/Traffic_Sign_GR_-_KOK_2009_-_P-32.svg" },
    { "code": "P-36", "url": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Traffic_Sign_GR_-_KOK_2009_-_P-36.svg" },
    { "code": "P-39", "url": "https://upload.wikimedia.org/wikipedia/commons/8/81/Traffic_Sign_GR_-_KOK_2009_-_P-39.svg" },
    { "code": "P-40", "url": "https://upload.wikimedia.org/wikipedia/commons/7/75/Traffic_Sign_GR_-_KOK_2009_-_P-40.svg" },
    { "code": "P-49", "url": "https://upload.wikimedia.org/wikipedia/commons/3/31/Traffic_Sign_GR_-_KOK_2009_-_P-49.svg" },
    { "code": "P-50", "url": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Traffic_Sign_GR_-_KOK_2009_-_P-50.svg" },
    { "code": "P-58", "url": "https://upload.wikimedia.org/wikipedia/commons/7/70/GR_-_KOK_2009_-_P-58%3B_Greek_road_sign.svg" },
    { "code": "P-59", "url": "https://upload.wikimedia.org/wikipedia/commons/7/7a/Traffic_Sign_GR_-_KOK_2009_-_P-59.svg" },
    { "code": "P-60", "url": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Traffic_Sign_GR_-_KOK_2009_-_P-60.svg" },
    { "code": "P-67", "url": "https://upload.wikimedia.org/wikipedia/commons/0/01/Traffic_Sign_GR_-_KOK_2009_-_P-67.svg" },
    { "code": "P-69", "url": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Traffic_Sign_GR_-_KOK_2009_-_P-69.svg" },
    { "code": "P-72", "url": "https://upload.wikimedia.org/wikipedia/commons/2/23/Traffic_Sign_GR_-_KOK_2009_-_P-72.svg" },
    { "code": "P-77", "url": "https://upload.wikimedia.org/wikipedia/commons/2/22/Traffic_Sign_GR_-_KOK_2009_-_%CE%A0-77.svg" },
    { "code": "P-94", "url": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Traffic_Sign_GR_-_KOK_2009_-_%CE%A0-94.svg" }
];

const downloadFile = (url: string, dest: string) => {
    return new Promise((resolve, reject) => {
        // Use curl as it handles Wikimedia's TLS/User-Agent requirements better than node https
        // -L follows redirects
        // -f fails silently on server error (so we know if it 404s)
        const command = `curl -L -f -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36" -o "${dest}" "${url}"`;

        exec(command, (error) => {
            if (error) {
                // Remove partial file if it failed
                if (fs.existsSync(dest)) fs.unlinkSync(dest);
                reject(error);
            } else {
                resolve(true);
            }
        });
    });
};

async function main() {
    console.log('Downloading real SVG assets from Wikimedia...');
    const signsDir = path.join(process.cwd(), 'src', 'assets', 'signs');

    // Create map for easy lookup
    const urlMap = new Map(scrapedData.map(i => [i.code, i.url]));

    const allAppSigns = [...dangerSigns, ...regulatorySigns, ...infoSigns];

    let successCount = 0;
    let skipCount = 0;
    let failCount = 0;

    for (const sign of allAppSigns) {
        // Try to find a match.
        // Our IDs are like 'K-1', 'R-52'. 
        // Wikimedia often maps K-1A (alpha) to K-1.

        // Exact match
        let url = urlMap.get(sign.id);

        // Suffix matches commonly used in the scraper
        if (!url) url = urlMap.get(sign.id + 'α'); // Greek alpha
        if (!url) url = urlMap.get(sign.id + 'a'); // English a
        if (!url) url = urlMap.get(sign.id + 'A'); // English A

        // For K-2 (Right), often wiki uses K-2a or K-2d? 
        // In the scraped list we see K-2α... let's trust the logic above picks K-2α.
        // If K-2 doesn't exist but K-1d does... K-1d is "Danger Right" (delta ~ dexia).
        // Check fuzzy mappings if standard suffix fails
        if (!url) {
            if (sign.id === 'K-2') url = urlMap.get('K-1δ'); // Fallback if K-2 missing
        }

        if (url) {
            const destPath = path.join(signsDir, `${sign.id}.svg`);
            try {
                await downloadFile(url, destPath);
                // Check if file is valid SVG size
                const stats = fs.statSync(destPath);
                if (stats.size > 0) {
                    console.log(`[OK] Downloaded ${sign.id} (${stats.size} bytes)`);
                    successCount++;
                } else {
                    console.log(`[ERR] Downloaded empty file for ${sign.id}`);
                    fs.unlinkSync(destPath);
                    failCount++;
                }
            } catch (error) { // Renamed from 'e' to 'error' and used it, or simply removed
                console.error(`[ERR] Failed to download ${sign.id}: ${error}`); // Using the error variable to fix unused var warning
                failCount++;
            }
        } else {
            // Keep the placeholder if no real asset found
            console.log(`[SKIP] No URL found for ${sign.id}`);
            skipCount++;
        }
    }

    console.log(`Finished.`);
    console.log(`Downloaded: ${successCount}`);
    console.log(`Skipped (Kept Placeholder): ${skipCount}`);
    console.log(`Failed: ${failCount}`);
}

main();
