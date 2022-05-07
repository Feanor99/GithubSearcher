import { useState, useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from '../res/styles';
import { IconButton, List } from 'react-native-paper';
import colors from '../res/colors';
import GithubRepository from '../repository/GithubRepository';
import GithubRequestState from '../enums/GithubRequestState';
import ListItem from '../models/ListItem';
import CategoryType from '../enums/CategoryType';

export default function HomeScreen() {

    const githubRepository = new GithubRepository()
    const [searchText, onChangesearchText] = useState(null);
    const [requestState, setRequestState] = useState(GithubRequestState.none);
    const [list, setList] = useState([]);

    useEffect(() => {
        if (requestState === GithubRequestState.success) {
            // todo use the list
            list.map(item => {
                console.log(item.category)
                console.log(item.name)
            })
        } else if (requestState === GithubRequestState.failed) {
            console.log("something went wrong while fetching data from api")
        }
    }, [requestState]);

    // NOTE: github returns unexpected data if limit exceeded {"message":"API rate limit exceeded for {ip.address}
    // (But here's the good news: Authenticated requests get a higher rate limit.
    // Check out the documentation for more details.)","documentation_url":
    // "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting"}

    const onPressSearchButton = () => {
        if (searchText) {
            setRequestState(GithubRequestState.loading)

            var successCounter = 0;
            let tempList = []

            githubRepository.searchUser(searchText).then(result => {
                if (result != null) {
                    try {
                        result.items.map(item =>
                            tempList.push(new ListItem(item.login, CategoryType.user, item))
                        );

                        console.log('user search success')

                        if (++successCounter == 2) {
                            setList(tempList)
                            setRequestState(GithubRequestState.success)
                        }
                    } catch (error) {
                        console.error(error);
                        setRequestState(GithubRequestState.failed)
                    }

                } else {
                    console.log('user search failed')
                }
            })

            githubRepository.searchRepository(searchText).then(result => {
                if (result != null) {
                    try {
                        result.items.map(item =>
                            tempList.push(new ListItem(item.name, CategoryType.repository, item))
                        );

                        console.log('repository search success')

                        if (++successCounter == 2) {
                            setList(tempList)
                            setRequestState(GithubRequestState.success)
                        }
                    } catch (error) {
                        console.error(error);
                        setRequestState(GithubRequestState.failed)
                    }
                } else {
                    console.log('repository search failed')
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Github Searcher</Text>

            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangesearchText}
                    value={searchText}
                    placeholder="Search users and repositories"
                    error={true}
                />

                <IconButton style={{ flex: 0.2, alignSelf: "center" }}
                    icon="magnify"
                    color={colors.primary}
                    size={28}
                    onPress={onPressSearchButton}
                />

            </View>
        </View>
    );
}