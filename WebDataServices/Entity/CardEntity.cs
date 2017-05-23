
using Phyah.Services.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Phyah.WebDataServices.Services
{
    public class CardEntity : IEntityConvert<Card>,IEntity
    {
        public string Id { get; set; }

        public string CardNo { get; set; }
        public string Name { get; set; }
        public string Data { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Href { get; set; }
        public string ImageSource { get; set; }
        public string Remark { get; set; }
        public string Classify { get; set; }
        
        /// <summary>
        /// 排序
        /// </summary>
        public int Sort { get; set; }
        public Card Convert()
        {
            return new Card()
            {
                Id = Id,
                CardNo = CardNo,
                Classify = Classify,
                Data = Data,
                Description = Description,
                Href = Href,
                ImageSource = ImageSource,
                Name = Name,
                Remark = Remark,
                Sort = Sort,
                Title = Title
            };
        }
    }
}
