class InternalCache:
    def __init__(self):
        self.cache = {}

    def save_value(self, key, value):
        self.cache[key] = value

    def get_saved_value(self, key):
        return self.cache.get(key, None)
    
internal_cache = InternalCache()
internal_cache.save_value('is_browser_opened', False)