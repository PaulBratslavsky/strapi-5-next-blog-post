import type { Struct, Schema } from '@strapi/strapi';

export interface BlocksTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials';
  info: {
    displayName: 'testimonial';
    description: '';
  };
  attributes: {
    authorName: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
    photo: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksSpoiler extends Struct.ComponentSchema {
  collectionName: 'components_blocks_spoilers';
  info: {
    displayName: 'spoiler';
  };
  attributes: {
    title: Schema.Attribute.String;
    content: Schema.Attribute.Text;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    displayName: 'richText';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.testimonial': BlocksTestimonial;
      'blocks.spoiler': BlocksSpoiler;
      'blocks.rich-text': BlocksRichText;
    }
  }
}
