from flask import Flask, render_template

app = Flask(__name__)

# The household data from your project
households_data = {
  "households": [
    { "household_id": "H001", "latitude": 12.708292159290565, "longitude": 75.50547163770362 },
    { "household_id": "H002", "latitude": 12.69442514080775, "longitude": 75.49440129644036 },
    { "household_id": "H003", "latitude": 12.700771823267116, "longitude": 75.49018283536094 },
    { "household_id": "H004", "latitude": 12.703709509126131, "longitude": 75.49816857937489 },
    { "household_id": "H005", "latitude": 12.705281331412493, "longitude": 75.49228411171029 },
    { "household_id": "H006", "latitude": 12.692953835840006, "longitude": 75.50886643289773 },
    { "household_id": "H007", "latitude": 12.700144975463154, "longitude": 75.49278617625538 },
    { "household_id": "H008", "latitude": 12.703982360632065, "longitude": 75.49266922743551 },
    { "household_id": "H009", "latitude": 12.695388671768384, "longitude": 75.49978858269343 },
    { "household_id": "H010", "latitude": 12.692991731005726, "longitude": 75.50112933611378 },
    { "household_id": "H011", "latitude": 12.690078520814014, "longitude": 75.50978011084116 },
    { "household_id": "H012", "latitude": 12.699050127910615, "longitude": 75.49376507459567 },
    { "household_id": "H013", "latitude": 12.709913454600162, "longitude": 75.49525371461964 },
    { "household_id": "H014", "latitude": 12.707921380112193, "longitude": 75.49873012487939 },
    { "household_id": "H015", "latitude": 12.695082322218715, "longitude": 75.50472654460033 },
    { "household_id": "H016", "latitude": 12.707450591244818, "longitude": 75.49171667417585 },
    { "household_id": "H017", "latitude": 12.70157130694596, "longitude": 75.50163292837847 },
    { "household_id": "H018", "latitude": 12.702933925491626, "longitude": 75.50486078629974 },
    { "household_id": "H019", "latitude": 12.696530007213447, "longitude": 75.49472530380858 },
    { "household_id": "H020", "latitude": 12.693650032379107, "longitude": 75.4986109465912 },
    { "household_id": "H021", "latitude": 12.696854530275125, "longitude": 75.50286002094701 },
    { "household_id": "H022", "latitude": 12.7015424136143, "longitude": 75.50557215619264 },
    { "household_id": "H023", "latitude": 12.705562133106016, "longitude": 75.5054868366544 },
    { "household_id": "H024", "latitude": 12.698028874218897, "longitude": 75.50358123556366 },
    { "household_id": "H025", "latitude": 12.69989548217364, "longitude": 75.49096664115149 },
    { "household_id": "H026", "latitude": 12.69419270770519, "longitude": 75.50986707771037 },
    { "household_id": "H027", "latitude": 12.703733006577789, "longitude": 75.4968296293525 },
    { "household_id": "H028", "latitude": 12.69291215101577, "longitude": 75.49543525358814 },
    { "household_id": "H029", "latitude": 12.691331896792587, "longitude": 75.49340275408784 },
    { "household_id": "H030", "latitude": 12.70401186583176, "longitude": 75.50979047247758 },
    { "household_id": "H031", "latitude": 12.69470869850444, "longitude": 75.49980148436696 },
    { "household_id": "H032", "latitude": 12.704309616294687, "longitude": 75.49689289113725 },
    { "household_id": "H033", "latitude": 12.709440169549827, "longitude": 75.50799411589773 },
    { "household_id": "H034", "latitude": 12.690254808349092, "longitude": 75.50963531291737 },
    { "household_id": "H035", "latitude": 12.690497309776177, "longitude": 75.49884546424398 },
    { "household_id": "H036", "latitude": 12.696140613164781, "longitude": 75.50220101388095 },
    { "household_id": "H037", "latitude": 12.691781651119785, "longitude": 75.49829511364678 },
    { "household_id": "H038", "latitude": 12.695331801866034, "longitude": 75.50859890718208 },
    { "household_id": "H039", "latitude": 12.704917614335775, "longitude": 75.5042790510931 },
    { "household_id": "H040", "latitude": 12.700878952171939, "longitude": 75.50734040030147 },
    { "household_id": "H041", "latitude": 12.690268447380054, "longitude": 75.50535846994248 },
    { "household_id": "H042", "latitude": 12.709383431318962, "longitude": 75.50192358829757 },
    { "household_id": "H043", "latitude": 12.707480765422176, "longitude": 75.49911661675884 },
    { "household_id": "H044", "latitude": 12.70466811241028, "longitude": 75.49709248444745 },
    { "household_id": "H045", "latitude": 12.708026353370945, "longitude": 75.49074234786148 },
    { "household_id": "H046", "latitude": 12.693218187524476, "longitude": 75.50429667356782 },
    { "household_id": "H047", "latitude": 12.691737677668065, "longitude": 75.49725400261433 },
    { "household_id": "H048", "latitude": 12.704232354570385, "longitude": 75.49029610929459 },
    { "household_id": "H049", "latitude": 12.70522594586419, "longitude": 75.49814609530895 },
    { "household_id": "H050", "latitude": 12.691732981411677, "longitude": 75.49443333331915 },
    { "household_id": "H051", "latitude": 12.697817232096476, "longitude": 75.50924208461231 },
    { "household_id": "H052", "latitude": 12.697536921873418, "longitude": 75.50316725069985 },
    { "household_id": "H053", "latitude": 12.69085209529438, "longitude": 75.49832329939969 },
    { "household_id": "H054", "latitude": 12.705886299295528, "longitude": 75.50445494760228 },
    { "household_id": "H055", "latitude": 12.700809229924776, "longitude": 75.5056511882206 },
    { "household_id": "H056", "latitude": 12.692237769454598, "longitude": 75.4982775859589 },
    { "household_id": "H057", "latitude": 12.694556128347688, "longitude": 75.50827669684071 },
    { "household_id": "H058", "latitude": 12.692265834019478, "longitude": 75.50655651801303 },
    { "household_id": "H059", "latitude": 12.700527393030072, "longitude": 75.50721642786968 },
    { "household_id": "H060", "latitude": 12.696614175989971, "longitude": 75.50757535407715 },
    { "household_id": "H061", "latitude": 12.699200422446777, "longitude": 75.49999766024918 },
    { "household_id": "H062", "latitude": 12.704075584162414, "longitude": 75.50850099561998 },
    { "household_id": "H063", "latitude": 12.70114351390779, "longitude": 75.50507587337815 },
    { "household_id": "H064", "latitude": 12.698279448346122, "longitude": 75.50381793113544 },
    { "household_id": "H065", "latitude": 12.709594059586903, "longitude": 75.50309344758877 },
    { "household_id": "H066", "latitude": 12.702587573145474, "longitude": 75.50114989941176 },
    { "household_id": "H067", "latitude": 12.709144972539939, "longitude": 75.49325749559863 },
    { "household_id": "H068", "latitude": 12.70169608702379, "longitude": 75.509579885551 },
    { "household_id": "H069", "latitude": 12.705867087962258, "longitude": 75.50020401606385 },
    { "household_id": "H070", "latitude": 12.708003176763082, "longitude": 75.5060504890843 },
    { "household_id": "H071", "latitude": 12.705287770684789, "longitude": 75.50914543602902 },
    { "household_id": "H072", "latitude": 12.697312916631805, "longitude": 75.49903919611818 },
    { "household_id": "H073", "latitude": 12.704000388426557, "longitude": 75.49079801972904 },
    { "household_id": "H074", "latitude": 12.701003148034264, "longitude": 75.50904772290949 },
    { "household_id": "H075", "latitude": 12.707742837941003, "longitude": 75.50616152773625 },
    { "household_id": "H076", "latitude": 12.708905429483416, "longitude": 75.49132023826364 },
    { "household_id": "H077", "latitude": 12.69496294057897, "longitude": 75.5055981158867 },
    { "household_id": "H078", "latitude": 12.70400962532266, "longitude": 75.49009273941277 },
    { "household_id": "H079", "latitude": 12.690905431454986, "longitude": 75.50883043799746 },
    { "household_id": "H080", "latitude": 12.701500215773862, "longitude": 75.49254496450452 },
    { "household_id": "H081", "latitude": 12.707165759901823, "longitude": 75.4959612245301 },
    { "household_id": "H082", "latitude": 12.705017663007698, "longitude": 75.49970690837085 },
    { "household_id": "H083", "latitude": 12.699145290500732, "longitude": 75.49028354422391 },
    { "household_id": "H084", "latitude": 12.696558506897063, "longitude": 75.49319773833535 },
    { "household_id": "H085", "latitude": 12.693373996533271, "longitude": 75.5077250070976 },
    { "household_id": "H086", "latitude": 12.697987791971402, "longitude": 75.5023511931121 },
    { "household_id": "H087", "latitude": 12.698885427997165, "longitude": 75.50383839262689 },
    { "household_id": "H088", "latitude": 12.70344620274583, "longitude": 75.50261018235878 },
    { "household_id": "H089", "latitude": 12.702957851474132, "longitude": 75.50357798638302 },
    { "household_id": "H090", "latitude": 12.707071253332888, "longitude": 75.49344340298403 },
    { "household_id": "H091", "latitude": 12.695184762294357, "longitude": 75.50854017186184 },
    { "household_id": "H092", "latitude": 12.705262265187004, "longitude": 75.4940711639188 },
    { "household_id": "H093", "latitude": 12.708840442479145, "longitude": 75.50639964262649 },
    { "household_id": "H094", "latitude": 12.702084558930586, "longitude": 75.49560892118036 },
    { "household_id": "H095", "latitude": 12.690375117181102, "longitude": 75.50882981331345 },
    { "household_id": "H096", "latitude": 12.693346349134456, "longitude": 75.49608556763134 },
    { "household_id": "H097", "latitude": 12.694396557114864, "longitude": 75.4983468185483 },
    { "household_id": "H098", "latitude": 12.69002159583763, "longitude": 75.50619385719827 },
    { "household_id": "H099", "latitude": 12.694000177507087, "longitude": 75.49273247905978 },
    { "household_id": "H100", "latitude": 12.692038038607837, "longitude": 75.49098232169521 }
  ]
}

def get_navigation_routes(data, chunk_size=10):
    """Generates a list of route data for the frontend."""
    households = data['households']
    routes = []
    
    for i in range(0, len(households), chunk_size):
        chunk = households[i:i + chunk_size]
        if not chunk:
            continue
        
        origin = f"{chunk[0]['latitude']},{chunk[0]['longitude']}"
        destination = f"{chunk[-1]['latitude']},{chunk[-1]['longitude']}"
        
        waypoints = [f"{p['latitude']},{p['longitude']}" for p in chunk[1:-1]]
        
        base_url = "https://www.google.com/maps/dir/?api=1"
        route_url = f"{base_url}&origin={origin}&destination={destination}"
        if waypoints:
            route_url += "&waypoints=" + "|".join(waypoints)
        
        start_id = chunk[0]['household_id']
        end_id = chunk[-1]['household_id']
        
        routes.append({
            "title": f"Route: {start_id} to {end_id}",
            "url": route_url
        })
    return routes

@app.route('/')
def index():
    # Generate the routes
    routes_data = get_navigation_routes(households_data)
    # Render the HTML template, passing the routes data to it
    return render_template('index.html', routes=routes_data)

if __name__ == '__main__':
    # Runs the app on a local development server
    app.run(debug=True)