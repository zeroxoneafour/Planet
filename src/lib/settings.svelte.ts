class Settings {
    

	toJSON(): object {
		return {};
	}
    fromJSON(obj: any) {
        if (obj == null) return;
        
    }
}

const settings: Settings = $state(new Settings());
export default settings;
