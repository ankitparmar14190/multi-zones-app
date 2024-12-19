import { DrupalClient } from 'next-drupal';

export const drupalClient = new DrupalClient(process.env.DRUPAL_BASE_URL!);