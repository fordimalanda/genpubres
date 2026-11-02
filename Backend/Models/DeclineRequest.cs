namespace Backend.Models;

public record DeclineRequest(string Content, List<string> Platforms, string Language);