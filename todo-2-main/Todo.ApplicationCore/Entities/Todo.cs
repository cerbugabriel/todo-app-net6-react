using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;


namespace TodoApp.ApplicationCore.Entities
{
    public class Todo
    {
        public Todo(string id, string title, string content, long creationTime, long dueDate, string status, string type)
        {
            Id = id;
            Title = title;
            Content = content;
            CreationTime = creationTime;
            DueDate = dueDate;
            Status = status;
            Type = type;
        }

        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
        [JsonProperty("creationTime")]
        public long CreationTime { get; set; }
        [JsonProperty("dueDate")]
        public long DueDate { get; set; }
        [JsonProperty("status")]
        public string Status { get; set; }
        [JsonProperty("type")]
        public string Type { get; set; }
    }
}